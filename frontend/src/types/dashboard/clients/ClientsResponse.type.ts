import { ClientType } from "./Client.type";

export type ClientsResponse = {
    data: ClientType[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
};