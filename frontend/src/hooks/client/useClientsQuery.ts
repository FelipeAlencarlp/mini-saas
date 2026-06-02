import { getClientsRequest } from "@/services/clients/getClientsRequest";
import { useQuery } from "@tanstack/react-query";

export function useClientsQuery(
    search: string,
    page: number,
    enabled = true
) {
    return useQuery({
        queryKey: ['clients', search, page],
        queryFn: () => getClientsRequest(search, page),
        placeholderData: (previousData) => previousData,
        enabled
    });
}