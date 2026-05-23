import { api } from "@/services/api";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterSuccess {
    success: true;
    data: {
        name: string;
        email: string;
        password: string;
    };
}

interface RegisterError {
    success: false;
    message: string;
}

type RegisterResponse = RegisterSuccess | RegisterError;

export async function registerRequest({
    name,
    email,
    password
}: RegisterRequest): Promise<RegisterResponse> {
    try {
        const response = await api.post('/auth/register', {
            name,
            email,
            password
        });

        return {
            success: true,
            data: response.data.data
        };
    } catch (error: any) {
        const message = error.response?.data?.message;

        return {
            success: false,
            message: message || 'Erro interno do servidor'
        };
    }
}