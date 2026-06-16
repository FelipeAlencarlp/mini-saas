import { ProductProps } from "@/types/dashboard/product";

export type ModalProductsType =
    | { type: 'create' }
    | { type: 'edit'; product: ProductProps }
    | { type: 'delete'; product: ProductProps }
    | null;

export interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        name: string,
        price: number,
        quantity: number
    ) => void;
    isPending?: boolean;
}

export interface EditProductModalProps {
    product: ProductProps | null;
    isOpen: boolean;
    isPending?: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        name: string,
        price: number,
        quantity: number
    ) => void;
}