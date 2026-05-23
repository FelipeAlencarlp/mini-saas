import { ClientType } from "@/types/dashboard/Client.type";
import { api } from "./api";

export async function getClients(): Promise<ClientType[]> {
    const response = await api.get('/clients');

    return response.data.data;
}