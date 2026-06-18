import { api } from "@/services/api";
import { UpdateUserRequestProps } from "@/types/dashboard/user";

export async function updateUserRequest({
    id,
    name,
    email
}: UpdateUserRequestProps) {
    const response = await api.patch(`/users/${id}`, {
        name,
        email
    });

    return response.data.data;
}