export type ServiceOrdersType = {
    id: number;
    status: string;
    total: number;
    user: {
        id: number;
        name: string;
    };
    client: {
        id: number;
        name: string;
    };
    createdAt: string;
};