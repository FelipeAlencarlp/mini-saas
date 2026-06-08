import { getUser } from "@/services/users/usersService";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
}