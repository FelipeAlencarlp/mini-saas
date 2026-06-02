import { api } from "@/services/api";

interface DeleteRequest {
    id: number;
}

export async function deleteServiceOrderRequest({ id }: DeleteRequest) {
    const response = await api.delete(`/service-orders/${id}`);

    return response.data.data;
}