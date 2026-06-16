import { api } from "@/services/api";
import { ServiceOrdersProps } from "@/types/dashboard/service_order";

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
}: UpdateRequest): Promise<ServiceOrdersProps> {
    const response = await api.patch(`/service-orders/edit-order/${id}`, {
        items
    });

    return response.data.data;
}