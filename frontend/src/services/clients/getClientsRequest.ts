import { api } from "@/services/api";
import { ClientsResponse } from "@/types/dashboard/ClientsResponse.type";

export async function getClientsRequest(
    search: string,
    page: number
): Promise<ClientsResponse> {
    const response = await api.get('/clients', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}