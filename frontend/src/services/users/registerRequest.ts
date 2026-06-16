import { api } from "@/services/api";
import { RegisterRequest } from "@/types/dashboard/service_order";

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