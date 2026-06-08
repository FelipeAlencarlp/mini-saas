import { api } from "@/services/api";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

interface CreateRequest {
    clientId: number;
    items: { productId: number, quantity: number }[];
}

export async function createServiceOrderRequest({
    clientId,
    items
}: CreateRequest): Promise<ServiceOrdersType> {
    const response = await api.post('/service-orders', {
        clientId,
        items
    });

    return response.data.data;
}