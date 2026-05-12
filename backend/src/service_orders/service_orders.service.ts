import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Injectable()
export class ServiceOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly clientsService: ClientsService,
        private readonly productsService: ProductsService
    ) {}

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

            const createdOrder = await tx.serviceOrder.create({
                data: {
                    userId: user.sub,
                    clientId: dto.clientId,
                    status: 'Iniciado'
                }
            });

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

                await tx.product.update({
                    where: { id: product.id },
                    data: {
                        quantity: product.quantity - item.quantity,
                        updatedAt: new Date()
                    }
                });

                const subtotal = Number(product.price) * item.quantity;
                total += subtotal;

                await tx.serviceOrderItem.create({
                    data: {
                        serviceOrderId: createdOrder.id,
                        productId: product.id,
                        quantity: item.quantity,
                        soldPrice: product.price,
                        subtotal,
                    }
                });
            }

            const orderWithItens = await tx.serviceOrder.findUnique({
                where: { id: createdOrder.id },
                select: {
                    id: true,
                    userId: true,
                    clientId: true,
                    status: true,
                    items: true
                }
            });

            return {
                ...orderWithItens!,
                items: orderWithItens!.items.map(item => ({
                    ...item,
                    soldPrice: item.soldPrice.toNumber(),
                    subtotal: item.subtotal.toNumber()
                })),
                total
            };
        });

        return order;
    }
}
