import { api } from "@/services/api";
import { UpdateUserRequestProps } from "@/types/dashboard/user";

export async function updateUserRequest({
    id,
    name,
    email,
    password
}: UpdateUserRequestProps) {
    const response = await api.patch(`/users/${id}`, {
        name,
        email,
        password
    });

    return response.data.data;
}