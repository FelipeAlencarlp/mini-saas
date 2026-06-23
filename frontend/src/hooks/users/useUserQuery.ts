import { getUser, getOneUser } from "@/services/users/usersService";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
}

export function useCheckEmail(email: string) {
    const query = useQuery({
        queryKey: ["check-email", email],
        queryFn: () => getOneUser(email),
        enabled: email.length > 5,
        retry: false,
    });

    return {
        ...query,
        emailExists: !!query.data,
    };
}