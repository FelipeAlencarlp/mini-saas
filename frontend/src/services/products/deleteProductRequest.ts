import { api } from "@/services/api";

interface DeleteRequest {
    id: number;
}

export async function deleteProductRequest({ id }: DeleteRequest) {
    const response = await api.delete(`/products/${id}`);

    return response.data.data;
}