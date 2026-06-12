import { api } from "@/services/api";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

interface CancelRequest {
    id: number;
}

export async function cancelServiceOrderRequest({
    id
}: CancelRequest): Promise<ServiceOrdersType> {
    const response = await api.patch(
        `/service-orders/cancel-order/${id}`
    );

    return response.data.data;
}