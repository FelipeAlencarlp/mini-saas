import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { ProductEntity } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { Prisma } from '../generated/prisma/client';
import { orderSelect } from './helpers/order.select';
import { orderMapper } from './helpers/order.mapper';
import { PaginatedResult } from '../common/types/paginated-result.type';
import { paginate } from '../common/paginate/paginate';

@Injectable()
export class ServiceOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly clientsService: ClientsService,
        private readonly productsService: ProductsService
    ) {}

    // helper
    private async products(items: CreateOrderDto['items']) {
        const products = await this.productsService.findProducts(
            items.map(item => item.productId)
        );

        // mapa para facilitar busca
        return new Map(
            products.map(product => [product.id, product])
        );
    }

    // calculate
    private calculateTotal(
        items: CreateOrderDto['items'],
        products: Map<number, ProductEntity>
    ): number {
        let total = 0;

        for (const item of items) {
            const product = products.get(item.productId);

            if (!product) {
                throw new BadRequestException(
                    `Produto ${item.productId} não encontrado.`
                );
            }

            if (product.quantity < item.quantity) {
                throw new BadRequestException(
                    `Estoque insuficiente para ${product.name}`
                );
            }

            total += Number(product.price) * item.quantity;
        }

        return total;
    }

    // database
    private createOrder(
        tx: Prisma.TransactionClient,
        userId: number,
        clientId: number,
        total: number
    ) {
        return tx.serviceOrder.create({
            data: {
                userId,
                clientId,
                status: 'Iniciado',
                total: new Prisma.Decimal(total)
            }
        });
    }

    private async createOrderItems(
        tx: Prisma.TransactionClient,
        orderId: number,
        items: CreateOrderDto['items'],
        products: Map<number, ProductEntity>
    ) {
        for (const item of items) {
            const product = products.get(item.productId);

            const subtotal = Number(product!.price) * item.quantity;

            await tx.serviceOrderItem.create({
                data: {
                    serviceOrderId: orderId,
                    productId: product!.id,
                    quantity: item.quantity,
                    soldPrice: product!.price,
                    subtotal
                }
            });
        }
    }

    private async updateProduct(
        tx: Prisma.TransactionClient,
        items: CreateOrderDto['items'],
        products: Map<number, ProductEntity>
    ) {
        for (const item of items) {
            const product = products.get(item.productId);

            if(product!.quantity < item.quantity) {
                throw new BadRequestException(
                    `Produto com ID ${product!.id} com estoque insuficiente.`
                );
            }

            await tx.product.update({
                where: { id: product!.id },
                data: {
                    quantity: product!.quantity - item.quantity
                }
            });
        }
    }

    // public methods
    async findAll(
        page: string,
        limit: string,
        filter?: string
    ): Promise<PaginatedResult<ServiceOrderEntity>> {
        const where = {
            deletedAt: null,
            ...(filter && {
                client: {
                    name: {
                        contains: filter,
                        mode: 'insensitive'
                    }
                }
            })
        };

        const select = {
            id: true,
            status: true,
            total: true,
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            client: {
                select: {
                    id: true,
                    name: true,
                }
            },
            items: true,
            createdAt: true,
        }

        const pagination = await paginate<ServiceOrderEntity>(
            this.prisma.serviceOrder,
            { page, limit },
            {
                where,
                select,
                orderBy: { createdAt: 'desc' }
            }
        );

        return {
            ...pagination,
            data: pagination.data.map(orderMapper)
        };
    }

    async findOne(id: number): Promise<ServiceOrderEntity> {
        const order = await this.prisma.serviceOrder.findUnique({
            where: { id, deletedAt: null },
            select: orderSelect
        });

        if (!order) {
            throw new NotFoundException('Ordem não encontrada.');
        }

        return orderMapper(order);
    }

    async create(
        user: CurrentUserDto,
        dto: CreateOrderDto
    ): Promise<ServiceOrderEntity> {
        await this.clientsService.findOne(dto.clientId);

        const products = await this.products(dto.items);
        const total = this.calculateTotal(dto.items, products);
        
        const order = await this.prisma.$transaction(async (tx) => {
            const createdOrder = await this.createOrder(
                tx,
                user.sub,
                dto.clientId,
                total
            );

            await this.createOrderItems(
                tx,
                createdOrder.id,
                dto.items,
                products
            );

            const orderWithItems = await tx.serviceOrder.findUnique({
                where: { id: createdOrder.id },
                select: orderSelect
            });

            return orderMapper(orderWithItems);
        });

        return order;
    }

    async endOrder(id: number): Promise<{ endedOrder: boolean }> {
        const order = await this.findOne(id);

        if (order.status !== 'Iniciado') {
            throw new BadRequestException(
                'Não é possível finalizar ordem já finalizada.'
            );
        }

        const products = await this.products(order.items);

        await this.prisma.$transaction(async (tx) => {
            await this.updateProduct(
                tx,
                order.items,
                products
            );

            await tx.serviceOrder.update({
                where:  { id: order.id },
                data: { status: 'Finalizado' }
            });
        });

        return { endedOrder: true }
    }

    async cancelOrder(id: number): Promise<{ canceledOrder: boolean }> {
        const order = await this.findOne(id);

        if (order.status !== 'Iniciado') {
            throw new BadRequestException(
                'Só é permitido cancelar ordens com status Iniciado.'
            );
        }

        await this.prisma.serviceOrder.update({
            where: { id: order.id },
            data: { status: 'Cancelado' }
        });

        return { canceledOrder: true }
    }

    async remove(id: number): Promise<{ serviceOrderRemoved: boolean }> {
        const order = await this.findOne(id);

        await this.prisma.serviceOrder.update({
            where: { id: order.id },
            data: { deletedAt: new Date() }
        });

        return { serviceOrderRemoved: true };
    }
}
