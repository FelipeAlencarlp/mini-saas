import { api } from "@/services/api";
import { UpdateProductRequest } from "@/types/dashboard/product";

export async function updateProductRequest({
    id,
    name,
    price,
    quantity
}: UpdateProductRequest) {
    const response = await api.patch(`/products/${id}`, {
        name,
        price,
        quantity
    });

    return response.data.data;
}