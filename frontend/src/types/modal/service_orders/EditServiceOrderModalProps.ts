import { ServiceOrdersType } from "@/types/dashboard/service_orders/ServiceOrders.type";

export type EditServiceOrderModalProps = {
    serviceOrder: ServiceOrdersType | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        items: {
            productId: number;
            quantity: number
        }[]
    ) => void;
    isPending?: boolean;
};