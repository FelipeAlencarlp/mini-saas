import { api } from "@/services/api";
import { ClientProps, CreateClientRequest } from "@/types/dashboard/client";

export async function createClientRequest({
    name,
    email,
    phone
}: CreateClientRequest): Promise<ClientProps> {
    const payload = {
        name,
        ...(email && { email }),
        ...(phone && { phone }),
    };

    const response = await api.post('/clients', payload);

    return response.data.data;
}