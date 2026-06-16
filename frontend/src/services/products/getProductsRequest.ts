import { api } from "../api";
import {ProductsResponseProps} from "@/types/dashboard/product";

export async function getProductsRequest(
    search: string,
    page: number
): Promise<ProductsResponseProps> {
    const response = await api.get('/products', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}