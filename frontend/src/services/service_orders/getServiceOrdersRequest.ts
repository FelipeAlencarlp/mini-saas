import { api } from "../api";
import {
    ServiceOrdersResponse
} from "@/types/dashboard/service_orders/ServiceOrdersResponse.type";

export async function getServiceOrdersRequest(
    search: string,
    page: number
): Promise<ServiceOrdersResponse> {
    const response = await api.get('/service-orders', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}