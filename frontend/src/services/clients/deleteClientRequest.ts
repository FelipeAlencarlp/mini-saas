import { api } from "@/services/api";
import { DeleteClientRequest } from "@/types/dashboard/client";

export async function deleteClientRequest({ id }: DeleteClientRequest) {
    const response = await api.delete(`/clients/${id}`);

    return response.data.data;
}