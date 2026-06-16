export interface ClientProps {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export interface ClientsResponseProps {
    data: ClientProps[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}

// Modal (helper)
export interface ClientModalProps {
    name: string;
    email?: string;
    phone?: string;
}

export interface ValidationClientErrors {
    name: string;
    email: string;
    phone: string;
}