import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserRequest } from "@/services/users/deleteUserRequest";
import { useToast } from "../useToast";

export function useDeleteUser() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteUserRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['users']
            });

            showToast('Usuário deletado com sucesso', 'success');
        },

        onError: (error: any) => {
            error.response?.data?.message ||
            'Erro interno do servidor',
            'error'
        }
    });
}