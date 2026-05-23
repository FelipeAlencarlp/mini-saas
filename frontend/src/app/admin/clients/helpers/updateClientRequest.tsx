import { api } from "@/services/api";

interface UpdateRequest {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export async function updateClientRequest({
    id,
    name,
    email,
    phone
}: UpdateRequest) {
    const payload = {
        name,
        ...(email && { email }),
        ...(phone && { phone }),
    };

    const response = await api.patch(`/clients/${id}`, payload);

    return response.data.data;
}