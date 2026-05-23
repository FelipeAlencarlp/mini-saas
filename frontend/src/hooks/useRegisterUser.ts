import { useMutation } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { registerRequest } from "@/app/register/helpers/registerRequest";
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
            showToast(
                error.response?.data?.message ||
                'Erro interno do servidor',
                'error'
            );
        }
    });
}