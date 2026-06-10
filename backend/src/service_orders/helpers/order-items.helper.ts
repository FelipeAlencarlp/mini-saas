import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemsHelper {
    async createOrderItems(
        tx: Prisma.TransactionClient,
        orderId: number,
        items: { productId: number; quantity: number }[],
        products: Map<number, ProductEntity>
    ) {
        for (const item of items) {
            const product = products.get(item.productId);

            await tx.serviceOrderItem.create({
                data: {
                    serviceOrderId: orderId,
                    productId: product!.id,
                    quantity: item.quantity,
                    soldPrice: product!.price,
                    subtotal: Number(product!.price) * item.quantity
                }
            });
        }
    }

    async createOrder(
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
}