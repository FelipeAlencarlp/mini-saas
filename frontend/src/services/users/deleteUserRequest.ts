import { api } from "@/services/api";

export async function deleteUserRequest({ id }: { id: number }) {
    const response = await api.delete(`/users/${id}`);

    return response.data.data;
}