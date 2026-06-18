import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserRequest } from "@/services/users/createUserRequest";
import { useToast } from "../useToast";

export function useCreateUser() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: createUserRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            });
            
            showToast('Usuário criado com sucesso', 'success');
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