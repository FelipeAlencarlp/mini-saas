import { ProductEntity } from "../entities/product.entity";

export function productMapper(product: any): ProductEntity {
    return {
      ...product,
      price: product.price.toNumber()
    };
}