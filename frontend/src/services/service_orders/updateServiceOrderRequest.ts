import { api } from "@/services/api";
import {
    ServiceOrdersProps,
    UpdateRequest
} from "@/types/dashboard/service_order";

export async function updateServiceOrderRequest({
    id,
    items
}: UpdateRequest): Promise<ServiceOrdersProps> {
    const response = await api.patch(`/service-orders/edit-order/${id}`, {
        items
    });

    return response.data.data;
}