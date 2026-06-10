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
    items: {
        productId: number;
        quantity: number;
    }[];
    createdAt: string;
    updatedAt: string;
};