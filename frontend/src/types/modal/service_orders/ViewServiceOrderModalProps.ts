import { ServiceOrdersType } from "@/types/dashboard/service_orders/ServiceOrders.type";

export type ViewServiceOrderModalProps = {
    serviceOrder: ServiceOrdersType | null;
    isOpen: boolean;
    onClose: () => void;
};