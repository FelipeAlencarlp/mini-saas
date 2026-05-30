import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import { deleteProductRequest } from "@/services/products/deleteProductRequest";

export function useDeleteProduct() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteProductRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            });

            showToast('Produto deletado com sucesso', 'success');
        },

        onError: (error: any) => {
            error.response?.data?.message ||
            'Erro interno do servidor',
            'error'
        }
    });
}