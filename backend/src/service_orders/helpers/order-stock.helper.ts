import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class OrderStockHelper {
    async updateProductStock(
        tx: Prisma.TransactionClient,
        items: { productId: number; quantity: number }[],
        products: Map<number, ProductEntity>
    ) {
        for (const item of items) {
            const product = products.get(item.productId);

            if (!product) continue;

            if (product.quantity < item.quantity) {
                throw new BadRequestException(
                    `Produto ${product.id} com estoque insuficiente`
                );
            }

            await tx.product.update({
                where: { id: product.id },
                data: {
                    quantity: product.quantity - item.quantity
                }
            });
        }
    }
}