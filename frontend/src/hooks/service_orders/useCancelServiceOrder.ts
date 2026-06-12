import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    cancelServiceOrderRequest
} from "@/services/service_orders/cancelServiceOrderRequest";

export function useCancelServiceOrder() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: cancelServiceOrderRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['serviceOrders']
            });
            
            showToast('Ordem de serviço cancelada com sucesso', 'success');
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