import { api } from "@/services/api";

interface DeleteRequest {
    id: number;
}

export async function deleteClientRequest({ id }: DeleteRequest) {
    const response = await api.delete(`/clients/${id}`);

    return response.data.data;
}