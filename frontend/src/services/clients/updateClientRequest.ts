import { api } from "@/services/api";
import { UpdateClientRequest } from "@/types/dashboard/client";

export async function updateClientRequest({
    id,
    name,
    email,
    phone
}: UpdateClientRequest) {
    const payload = {
        name,
        ...(email && { email }),
        ...(phone && { phone }),
    };

    const response = await api.patch(`/clients/${id}`, payload);

    return response.data.data;
}