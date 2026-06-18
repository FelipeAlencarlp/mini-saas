import { api } from "@/services/api";
import { CreateUserRequestProps } from "@/types/dashboard/user";

export async function createUserRequest({
    name,
    email,
    password
}: CreateUserRequestProps) {
    const response = await api.post('/auth/register', {
        name,
        email,
        password
    });

    return response.data.data;
}