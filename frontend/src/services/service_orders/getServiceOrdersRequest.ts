import { api } from "../api";
import { ServiceOrdersResponseProps } from "@/types/dashboard/service_order";

export async function getServiceOrdersRequest(
    search: string,
    page: number
): Promise<ServiceOrdersResponseProps> {
    const response = await api.get('/service-orders', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}