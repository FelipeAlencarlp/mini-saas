import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ServiceOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly clientsService: ClientsService,
        private readonly productsService: ProductsService
    ) {}

    private customerSelect = {
        id: true,
        userId: true,
        clientId: true,
        status: true,
        items: true,
        total: true
    }

    private orderMapper(order: any): ServiceOrderEntity {
        return {
            ...order,
            items: order.items.map(item => ({
                ...item,
                soldPrice: item.soldPrice.toNumber(),
                subtotal: item.subtotal.toNumber()
            })),
        }
    }

    async findAll(): Promise<ServiceOrderEntity[]> {
        const orders = await this.prisma.serviceOrder.findMany({
            where: { deletedAt: null },
            select: this.customerSelect,
            orderBy: { id: 'asc' }
        });

        return orders.map(this.orderMapper);
    }

    async findOne(id: number): Promise<ServiceOrderEntity> {
        const order = await this.prisma.serviceOrder.findUnique({
            where: { id, deletedAt: null },
            select: this.customerSelect
        });

        if (!order) {
            throw new NotFoundException('Ordem não encontrada.');
        }

        return this.orderMapper(order);
    }

    async create(
        user: CurrentUserDto,
        dto: CreateOrderDto
    ): Promise<ServiceOrderEntity> {
        await this.clientsService.findOne(dto.clientId);

        const productIds = dto.items.map(item => item.productId);
        const products = await this.productsService.findProducts(productIds);

        // mapa para facilitar busca
        const productsMap = new Map(
            products.map(product => [product.id, product])
        );
        
        const order = await this.prisma.$transaction(async (tx) => {
            let total = 0;

            for (const item of dto.items) {
                const product = productsMap.get(item.productId);

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

                const subtotal = Number(product.price) * item.quantity;
                total += subtotal;
            }

            const createdOrder = await tx.serviceOrder.create({
                data: {
                    userId: user.sub,
                    clientId: dto.clientId,
                    status: 'Iniciado',
                    total: new Prisma.Decimal(total)
                }
            });

            for (const item of dto.items) {
                const product = productsMap.get(item.productId);
                const subtotal = Number(product!.price) * item.quantity;

                await tx.serviceOrderItem.create({
                    data: {
                        serviceOrderId: createdOrder.id,
                        productId: product!.id,
                        quantity: item.quantity,
                        soldPrice: product!.price,
                        subtotal,
                    }
                });
            }

            const orderWithItens = await tx.serviceOrder.findUnique({
                where: { id: createdOrder.id },
                select: this.customerSelect
            });

            return this.orderMapper(orderWithItens);
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

        const products = await this.productsService.findProducts(
            order.items.map(item => item.productId)
        );

        const productsMap = new Map(
            products.map(product => [product.id, product])
        );

        await this.prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                const product = productsMap.get(item.productId);

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

            await tx.serviceOrder.update({
                where:  { id: order.id },
                data: { status: 'Finalizado' }
            });
        });

        return { endedOrder: true }
    }
}
