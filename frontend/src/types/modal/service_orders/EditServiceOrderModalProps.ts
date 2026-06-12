import { ServiceOrdersType } from "@/types/dashboard/service_orders/ServiceOrders.type";

export type EditServiceOrderModalProps = {
    serviceOrder: ServiceOrdersType | null;
    isOpen: boolean;
    isPending?: boolean;
    onClose: () => void;
    onCancel: (id: number) => void;
    onConfirm: (
        id: number,
        items: {
            productId: number;
            quantity: number
        }[]
    ) => void;
    onFinish: (id: number) => void;
};