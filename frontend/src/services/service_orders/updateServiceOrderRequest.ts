import { api } from "@/services/api";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

interface UpdateRequest {
    id: number;
    items: {
        productId: number,
        quantity: number
    }[];
}

export async function updateServiceOrderRequest({
    id,
    items
}: UpdateRequest): Promise<ServiceOrdersType> {
    const response = await api.patch(`/service-orders/edit-order/${id}`, {
        items
    });

    return response.data.data;
}