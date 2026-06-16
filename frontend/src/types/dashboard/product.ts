export interface ProductProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
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

// request
export interface CreateProductRequest {
    name: string;
    price: number;
    quantity: number;
}