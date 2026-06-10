import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../products/products.service';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class OrderProductsHelper {
    constructor(private readonly productsService: ProductsService) {}

    async getProductsMap(items: { productId: number }[]) {
        const products = await this.productsService.findProducts(
            items.map(i => i.productId)
        );

        return new Map<number, ProductEntity>(
            products.map(product => [product.id, product])
        );
    }
}