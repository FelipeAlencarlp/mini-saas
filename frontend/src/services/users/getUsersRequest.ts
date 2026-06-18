import { api } from "@/services/api";
import { UsersResponseProps } from "@/types/dashboard/user";

export async function getUsersRequest(
    search: string,
    page: number
): Promise<UsersResponseProps> {
    const response = await api.get('/users', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}