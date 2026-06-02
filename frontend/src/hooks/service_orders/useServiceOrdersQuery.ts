import { useQuery } from "@tanstack/react-query";
import {
    getServiceOrdersRequest
} from "@/services/service_orders/getServiceOrdersRequest";

export function useServiceOrdersQuery(
    search: string,
    page: number
) {
    return useQuery({
        queryKey: ['serviceOrders', search, page],
        queryFn: () => getServiceOrdersRequest(search, page),
        placeholderData: (previousData) => previousData,
    });
}