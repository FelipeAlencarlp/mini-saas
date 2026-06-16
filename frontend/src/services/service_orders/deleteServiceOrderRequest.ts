import { api } from "@/services/api";
import { DeleteRequest } from "@/types/dashboard/service_order";

export async function deleteServiceOrderRequest({ id }: DeleteRequest) {
    const response = await api.delete(`/service-orders/${id}`);

    return response.data.data;
}