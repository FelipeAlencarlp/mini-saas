import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    deleteClientRequest
} from "@/services/clients/deleteClientRequest";

export function useDeleteClient() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteClientRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['clients']
            });

            showToast('Cliente deletado com sucesso', 'success');
        },

        onError: (error: any) => {
            error.response?.data?.message ||
            'Erro interno do servidor',
            'error'
        }
    });
}