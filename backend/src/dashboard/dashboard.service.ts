import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductsService } from '../products/products.service';
import { ClientsService } from '../clients/clients.service';
import { ProductDashboardEntity } from './entity/product-dashboard.entity';
import { ClientDashboardEntity } from './entity/client-dashboard.entity';

@Injectable()
export class DashboardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly products: ProductsService,
        private readonly clients: ClientsService
    ) {}

    async total(): Promise<{ total: number}> {
        const orders = await this.prisma.serviceOrder.count({
            where: { status: 'Iniciado' }
        });

        return { total: orders };
    }

    async totalEndedOrders(): Promise<{ totalEnded: number }> {
        const orders = await this.prisma.serviceOrder.count({
            where: { status: 'Finalizado' }
        });

        return { totalEnded: orders };
    }

    async totalSold(): Promise<{ valueTotalSold: number }> {
        const result = await this.prisma.serviceOrder.aggregate({
            _sum: { total: true },
            where: { status: 'Finalizado' }
        });

        const totalFinal = result._sum.total ?? 0;

        return { valueTotalSold: Number(totalFinal) }
    }

    async productMostSold(): Promise<ProductDashboardEntity> {
        let resultItem = await this.prisma.serviceOrderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            where: {
                serviceOrder: { status: 'Finalizado' }
            },
            orderBy: {
                _sum: { quantity: 'desc' }
            },
            take: 1
        });

        if (resultItem.length === 0) {
            throw new BadRequestException('Lista de ordens vazia.')
        }

        const result = resultItem.map(r => ({
            id: r.productId,
            quantity: r._sum.quantity || 0
        }));

        const product = await this.products.findOne(result[0].id);

        return {
            productId: result[0].id,
            productName: product.name,
            quantitySold: result[0].quantity
        };
    }

    async clientMostOrders(): Promise<ClientDashboardEntity> {
        const resultOrder = await this.prisma.serviceOrder.groupBy({
            by: ['clientId'],
            where: { status: 'Finalizado' },
            _count: { clientId: true },
            orderBy: {
                _count: { clientId: 'desc' }
            },
            take: 1
        });

        if (resultOrder.length === 0) {
            throw new BadRequestException('Lista de ordens vazia.')
        }

        const result = resultOrder.map(r => ({
            id: r.clientId,
            orders: r._count.clientId
        }));

        const client = await this.clients.findOne(result[0].id);

        return {
            clientId: result[0].id,
            clientName: client.name,
            quantityOrders: result[0].orders
        };
    }
}
