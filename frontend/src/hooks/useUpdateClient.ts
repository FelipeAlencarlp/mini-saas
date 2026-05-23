import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import {
    updateClientRequest
} from "@/app/admin/clients/helpers/updateClientRequest";

export function useUpdateClient() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: updateClientRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['clients']
            });

            showToast('Cliente atualizado com sucesso', 'success');
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