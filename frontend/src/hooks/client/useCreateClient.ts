import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    createClientRequest
} from "@/services/clients/createClientRequest";

export function useCreateClient() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: createClientRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['clients']
            });
            
            showToast('Cliente criado com sucesso', 'success');
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