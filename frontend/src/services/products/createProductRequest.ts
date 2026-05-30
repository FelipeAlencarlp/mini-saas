import { api } from "@/services/api";
import { ProductType } from "@/types/dashboard/products/Product.type";

interface CreateRequest {
    name: string;
    price: number;
    quantity: number;
}

export async function createProductRequest({
    name,
    price,
    quantity
}: CreateRequest): Promise<ProductType> {
    const response = await api.post('/products', {
        name,
        price,
        quantity
    });

    return response.data.data;
}