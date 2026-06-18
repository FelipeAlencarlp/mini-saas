import { api } from "@/services/api";

export async function deleteClientRequest({ id }: { id: number }) {
    const response = await api.delete(`/clients/${id}`);

    return response.data.data;
}