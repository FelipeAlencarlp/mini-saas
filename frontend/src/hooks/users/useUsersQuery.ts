import { useQuery } from "@tanstack/react-query";
import { getUsersRequest } from "@/services/users/getUsersRequest";

export function useUsersQuery(
    search: string,
    page: number,
    enabled = true
) {
    return useQuery({
        queryKey: ['users', search, page],
        queryFn: () => getUsersRequest(search, page),
        placeholderData: (previousData) => previousData,
        enabled
    });
}