import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import { updateProductRequest } from "@/services/products/updateProductRequest";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: updateProductRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['products']
            });

            showToast('Produto atualizado com sucesso', 'success');
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