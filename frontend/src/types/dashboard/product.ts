export interface ProductProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductsResponseProps {
    data: ProductProps[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}

// Modal (helper)
export interface ProductModalProps {
    name: string;
    price: string;
    quantity: string;
}

export interface ValidationErrors {
    name: string;
    price: string;
    quantity: string;
}

// request
export interface CreateProductRequest {
    name: string;
    price: number;
    quantity: number;
}

export interface UpdateProductRequest {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface DeleteProductRequest {
    id: number;
}
