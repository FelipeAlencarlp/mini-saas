import { api } from "@/services/api";
import { ClientProps } from "@/types/dashboard/client";

interface CreateRequest {
    name: string;
    email?: string;
    phone?: string;
}

export async function createClientRequest({
    name,
    email,
    phone
}: CreateRequest): Promise<ClientProps> {
    const payload = {
        name,
        ...(email && { email }),
        ...(phone && { phone }),
    };

    const response = await api.post('/clients', payload);

    return response.data.data;
}