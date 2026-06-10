import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class OrderCalculatorHelper {
    calculateTotal(
        items: { productId: number; quantity: number }[],
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
}