import { api } from "@/services/api";
import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

interface FinishRequest {
    id: number;
}

export async function finishServiceOrderRequest({
    id
}: FinishRequest): Promise<ServiceOrdersType> {
    const response = await api.patch(
        `/service-orders/end-order/${id}`
    );

    return response.data.data;
}