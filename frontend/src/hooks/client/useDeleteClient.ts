import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    deleteClientRequest
} from "@/app/admin/clients/helpers/deleteClientRequest";

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