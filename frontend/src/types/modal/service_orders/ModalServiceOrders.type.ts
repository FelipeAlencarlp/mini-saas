import {
    ServiceOrdersType
} from "@/types/dashboard/service_orders/ServiceOrders.type";

export type ModalServiceOrdersType =
    | { type: 'create'; }
    | { type: 'view'; serviceOrder: ServiceOrdersType }
    | { type: 'edit'; serviceOrder: ServiceOrdersType }
    | { type: 'delete'; serviceOrder: ServiceOrdersType }
    | null;