import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    createServiceOrderRequest
} from "@/services/service_orders/createServiceOrderRequest";

export function useCreateServiceOrder() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: createServiceOrderRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['serviceOrders']
            });
            
            showToast('Ordem de serviço criada com sucesso', 'success');
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