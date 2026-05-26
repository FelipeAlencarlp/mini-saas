import { api } from "@/services/api";

interface LoginRequest {
    email: string;
    password: string;
}

export async function loginRequest({
    email, password
}: LoginRequest) {
    const response = await api.post('/auth/login', {
        email,
        password
    });

    return response.data.data;
}