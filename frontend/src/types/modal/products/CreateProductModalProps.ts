export type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        name: string,
        price: number,
        quantity: number
    ) => void;
    isPending?: boolean;
};