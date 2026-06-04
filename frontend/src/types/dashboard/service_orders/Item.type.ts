import { ProductType } from "../products/Product.type";

export type Item = {
    product: ProductType;
    quantity: number;
    price: number;
};