import { api } from "@/services/api";
import { LoginRequest } from "@/types/login";

export async function loginRequest({
    email, password
}: LoginRequest) {
    const response = await api.post('/auth/login', {
        email,
        password
    });

    return response.data.data;
}