import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import { createProductRequest } from "@/services/products/createProductRequest";

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: createProductRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            });
            
            showToast('Produto criado com sucesso', 'success');
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