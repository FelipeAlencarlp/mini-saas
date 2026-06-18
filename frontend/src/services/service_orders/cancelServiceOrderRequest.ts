import { api } from "@/services/api";
import { ServiceOrdersProps } from "@/types/dashboard/service_order";

export async function cancelServiceOrderRequest({
    id
}: { id: number }): Promise<ServiceOrdersProps> {
    const response = await api.patch(
        `/service-orders/cancel-order/${id}`
    );

    return response.data.data;
}