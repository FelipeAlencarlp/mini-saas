import { api } from "@/services/api";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

interface CreateRequest {
    userId: number;
    clientId: number;
    items: number[];
}

export async function createServiceOrderRequest({
    userId,
    clientId,
    items
}: CreateRequest): Promise<ServiceOrdersType> {
    const response = await api.post('/service-orders', {
        userId,
        clientId,
        items
    });

    return response.data.data;
}