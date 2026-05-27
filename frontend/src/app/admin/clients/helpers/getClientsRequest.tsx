import { api } from "@/services/api";
import { ClientType } from "@/types/dashboard/Client.type";

export async function getClientsRequest(
    search: string
): Promise<ClientType[]> {
    const response = await api.get('/clients', {
        params: {
            filter: search
        }
    });

    return response.data.data;
}