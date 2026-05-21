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
        if (
            error.response?.status === 400 ||
            error.response?.status === 409
        ) {
            return {
                success: false,
                message: 'Esse e-mail já está sendo utilizado.'
            };
        }

        return {
            success: false,
            message: 'Erro interno do servidor'
        };
    }
}