import { api } from "@/services/api";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerRequest({
    name,
    email,
    password
}: RegisterRequest) {
    const response = await api.post('/auth/register', {
        name,
        email,
        password
    });

    return response.data.data;
}