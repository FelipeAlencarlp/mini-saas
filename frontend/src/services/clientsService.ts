import { ClientType } from "@/types/Client.type";
import { api } from "./api";

export async function getClients(): Promise<ClientType[]> {
    const response = await api.get('/clients');

    return response.data.data;
}