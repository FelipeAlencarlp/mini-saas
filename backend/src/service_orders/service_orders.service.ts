import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientsService } from '../clients/clients.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { Prisma } from '../generated/prisma/client';
import { orderSelect } from './helpers/order.select';
import { orderMapper } from './helpers/order.mapper';
import { OrderProductsHelper } from './helpers/order-products.helper';
import { OrderCalculatorHelper } from './helpers/order-calculator.helper';
import { OrderHelper } from './helpers/order.helper';
import { OrderItemsHelper } from './helpers/order-items.helper';
import { OrderStockHelper } from './helpers/order-stock.helper';
import { PaginatedResult } from '../common/types/paginated-result.type';
import { paginate } from '../common/paginate/paginate';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class ServiceOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly clientsService: ClientsService,
        private readonly orderProductsHelper: OrderProductsHelper,
        private readonly orderCalculatorHelper: OrderCalculatorHelper,
        private readonly orderHelper: OrderHelper,
        private readonly orderItemsHelper: OrderItemsHelper,
        private readonly orderStockHelper: OrderStockHelper,
    ) {}

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
            updatedAt: true,
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

        const products = await this.orderProductsHelper.getProductsMap(dto.items);

        const total = this.orderCalculatorHelper.calculateTotal(
            dto.items,
            products
        );

        const order = await this.prisma.$transaction(async (tx) => {
            const createdOrder = await this.orderHelper.createOrder(
                tx,
                user.sub,
                dto.clientId,
                total
            );

            await this.orderItemsHelper.createOrderItems(
                tx,
                createdOrder.id,
                dto.items,
                products
            );

            return tx.serviceOrder.findUnique({
                where: { id: createdOrder.id },
                select: orderSelect
            });
        });

        return orderMapper(order);
    }

    async update(
        id: number,
        dto: UpdateOrderDto
    ): Promise<ServiceOrderEntity> {
        await this.findOne(id);

        const products = await this.orderProductsHelper.getProductsMap(dto.items);

        const total = this.orderCalculatorHelper.calculateTotal(
            dto.items,
            products
        );

        const order = await this.prisma.$transaction(async (tx) => {
            await tx.serviceOrder.update({
                where: { id },
                data: {
                    total: new Prisma.Decimal(total),
                },
            });

            await tx.serviceOrderItem.deleteMany({
                where: { serviceOrderId: id },
            });

            await this.orderItemsHelper.createOrderItems(
                tx,
                id,
                dto.items,
                products
            );

            return tx.serviceOrder.findUnique({
                where: { id },
                select: orderSelect,
            });
        });

        return orderMapper(order);
    }

    async endOrder(id: number): Promise<{ endedOrder: boolean }> {
        const order = await this.findOne(id);

        if (order.status !== 'Iniciado') {
            throw new BadRequestException(
                'Não é possível finalizar ordem já finalizada.'
            );
        }

        const products = await this.orderProductsHelper.getProductsMap(order.items);

        await this.prisma.$transaction(async (tx) => {
            await this.orderStockHelper.updateProductStock(
                tx,
                order.items,
                products
            );

            await tx.serviceOrder.update({
                where: { id: order.id },
                data: { status: 'Finalizado' },
            });
        });

        return { endedOrder: true };
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