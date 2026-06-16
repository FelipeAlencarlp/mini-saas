import { api } from "@/services/api";
import { DeleteProductRequest } from "@/types/dashboard/product";

export async function deleteProductRequest({ id }: DeleteProductRequest) {
    const response = await api.delete(`/products/${id}`);

    return response.data.data;
}