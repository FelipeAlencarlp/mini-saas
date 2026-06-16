import { api } from "@/services/api";
import {
    ServiceOrdersProps,
    CancelRequest
} from "@/types/dashboard/service_order";

export async function cancelServiceOrderRequest({
    id
}: CancelRequest): Promise<ServiceOrdersProps> {
    const response = await api.patch(
        `/service-orders/cancel-order/${id}`
    );

    return response.data.data;
}