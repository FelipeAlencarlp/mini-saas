import { useMutation } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { registerRequest } from "@/services/users/registerRequest";
import { useRouter } from "next/navigation";

export function useRegisterUser() {
    const router = useRouter();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: registerRequest,

        onSuccess: async () => {
            router.push('/login?success=registered');
        },

        onError: (error: any) => {
            if (
                error.response?.status === 409 ||
                error.response?.status === 400
            ) {
                showToast(
                    'E-mail escolhido já está em uso',
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