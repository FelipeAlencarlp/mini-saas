import { api } from "@/services/api";
import { CreateProductRequest, ProductProps } from "@/types/dashboard/product";

export async function createProductRequest({
    name,
    price,
    quantity
}: CreateProductRequest): Promise<ProductProps> {
    const response = await api.post('/products', {
        name,
        price,
        quantity
    });

    return response.data.data;
}