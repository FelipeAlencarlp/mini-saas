import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    finishServiceOrderRequest
} from "@/services/service_orders/finishServiceOrderRequest";

export function useFinishServiceOrder() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: finishServiceOrderRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['serviceOrders']
            });
            
            showToast('Ordem de serviço finalizada com sucesso', 'success');
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