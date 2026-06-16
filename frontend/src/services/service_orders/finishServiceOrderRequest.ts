import { api } from "@/services/api";
import { ServiceOrdersProps } from "@/types/dashboard/service_order";

interface FinishRequest {
    id: number;
}

export async function finishServiceOrderRequest({
    id
}: FinishRequest): Promise<ServiceOrdersProps> {
    const response = await api.patch(
        `/service-orders/end-order/${id}`
    );

    return response.data.data;
}