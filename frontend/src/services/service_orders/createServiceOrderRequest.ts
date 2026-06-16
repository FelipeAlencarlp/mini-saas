import { api } from "@/services/api";
import {
    ServiceOrdersProps,
    CreateRequest
} from "@/types/dashboard/service_order";


export async function createServiceOrderRequest({
    clientId,
    items
}: CreateRequest): Promise<ServiceOrdersProps> {
    const response = await api.post('/service-orders', {
        clientId,
        items
    });

    return response.data.data;
}