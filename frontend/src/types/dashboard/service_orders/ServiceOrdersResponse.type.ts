import { ServiceOrdersType } from "./ServiceOrders.type";

export type ServiceOrdersResponse = {
    data: ServiceOrdersType[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
};