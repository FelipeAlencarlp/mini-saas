import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    updateServiceOrderRequest
} from "@/services/service_orders/updateServiceOrderRequest";

export function useUpdateServiceOrder() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: updateServiceOrderRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['serviceOrders']
            });
            
            showToast('Ordem de serviço atualizada com sucesso', 'success');
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