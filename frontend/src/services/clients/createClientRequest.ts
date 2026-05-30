import { api } from "@/services/api";
import { ClientType } from "@/types/dashboard/clients/Client.type";

interface CreateRequest {
    name: string;
    email?: string;
    phone?: string;
}

export async function createClientRequest({
    name,
    email,
    phone
}: CreateRequest): Promise<ClientType> {
    const payload = {
        name,
        ...(email && { email }),
        ...(phone && { phone }),
    };

    const response = await api.post('/clients', payload);

    return response.data.data;
}