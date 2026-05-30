import { api } from "../api";
import {
    ProductsResponse
} from "@/types/dashboard/products/ProductsResponse.type";

export async function getProductsRequest(
    search: string,
    page: number
): Promise<ProductsResponse> {
    const response = await api.get('/products', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}