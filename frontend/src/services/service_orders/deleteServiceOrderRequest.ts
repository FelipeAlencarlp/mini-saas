import { api } from "@/services/api";

export async function deleteServiceOrderRequest({ id }: { id: number }) {
    const response = await api.delete(`/service-orders/${id}`);

    return response.data.data;
}