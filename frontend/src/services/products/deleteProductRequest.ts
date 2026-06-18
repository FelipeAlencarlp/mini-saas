import { api } from "@/services/api";

export async function deleteProductRequest({ id }: { id: number }) {
    const response = await api.delete(`/products/${id}`);

    return response.data.data;
}