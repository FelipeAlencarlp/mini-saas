import { api } from "@/services/api";
import { ServiceOrdersProps } from "@/types/dashboard/service_order";

export async function finishServiceOrderRequest({
    id
}: { id: number }): Promise<ServiceOrdersProps> {
    const response = await api.patch(
        `/service-orders/end-order/${id}`
    );

    return response.data.data;
}