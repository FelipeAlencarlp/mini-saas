import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../useToast";
import { useAuth } from "../useAuth";
import { loginRequest } from "@/app/login/helpers/loginRequest";

export function useLogin() {
    const router = useRouter();
    const { login } = useAuth();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: loginRequest,

        onSuccess: async (data) => {
            login(
                data.accessToken,
                data.refreshToken
            );

            router.push('/admin');
        },

        onError: (error: any) => {
            if (error.response?.status === 401) {
                showToast(
                    'E-mail ou senha incorretos. Tente novamente.',
                    'error'
                );

                return;
            }

            showToast(
                error.response?.data?.message ||
                'Erro interno do servidor',
                'error'
            );
        }
    });
}