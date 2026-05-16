import { api } from "@/services/api";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginSuccess {
    success: true;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface LoginError {
    success: false;
    message: string;
}

type LoginResponse = LoginSuccess | LoginError;

export async function loginRequest(
    { email, password }: LoginRequest
): Promise<LoginResponse> {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });

        return {
            success: true,
            data: response.data.data
        };
    } catch (error: any) {
        if (error.response?.status === 401) {
            return {
                success: false,
                message: 'E-mail ou senha inválidos'
            };
        }

        return {
            success: false,
            message: 'Erro interno do servidor'
        };
    }
}