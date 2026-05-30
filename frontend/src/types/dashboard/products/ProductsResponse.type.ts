import { ProductType } from "./Product.type";

export type ProductsResponse = {
    data: ProductType[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
};