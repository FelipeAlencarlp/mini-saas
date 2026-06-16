import { api } from "@/services/api";
import {
    ClientsResponseProps
} from "@/types/dashboard/client";

export async function getClientsRequest(
    search: string,
    page: number
): Promise<ClientsResponseProps> {
    const response = await api.get('/clients', {
        params: {
            filter: search,
            page,
            limit: 10
        }
    });

    return response.data;
}