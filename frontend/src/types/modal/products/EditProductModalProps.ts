import { ProductType } from "@/types/dashboard/products/Product.type";

export type EditProductModalProps = {
    product: ProductType | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        name: string,
        price: number,
        quantity: number
    ) => void;
    isPending?: boolean;
};