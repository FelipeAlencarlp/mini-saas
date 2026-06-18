import { ClientProps } from "./client";
import { ProductProps } from "./product";

export interface ServiceOrdersProps {
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
}

export interface ServiceOrdersResponseProps {
    data: ServiceOrdersProps[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}

export interface BaseCardProps {
    children: React.ReactNode
    titleP: string;
    className?: string;
}

// Modal (helpers)
export interface ServiceOrderClientModalProps {
    client: ClientProps | null;
}

// Items
export interface ItemProps {
    product: ProductProps;
    quantity: number;
    price: number;
}

export interface EditItemProps {
    items: [
        {
            productId: number;
            quantity: number;
        }
    ]
}

export interface SelectProductProps {
    value: string;
    error: string;
    products: ProductProps[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ProductsListProps {
    items: ItemProps[];
    handleChangeQuantity: (id: number, value: string) => void;
    handleRemoveProductList: (id: number) => void;
}

export interface TotalsProps {
    items: ItemProps[];
    subtotal: number;
    quantityProduct: number;
}

export interface ViewProductsListProps {
    items: ItemProps[];
}

// Request
export interface CreateRequest {
    clientId: number;
    items: {
        productId: number,
        quantity: number
    }[];
}

export interface UpdateRequest {
    id: number;
    items: {
        productId: number,
        quantity: number
    }[];
}