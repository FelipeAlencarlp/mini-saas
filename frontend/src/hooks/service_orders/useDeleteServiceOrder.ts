import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useToast";
import {
    deleteServiceOrderRequest
} from "@/services/service_orders/deleteServiceOrderRequest";

export function useDeleteServiceOrder() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteServiceOrderRequest,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['serviceOrders']
            });

            showToast('Ordem de serviço deletada com sucesso', 'success');
        },

        onError: (error: any) => {
            error.response?.data?.message ||
            'Erro interno do servidor',
            'error'
        }
    });
}