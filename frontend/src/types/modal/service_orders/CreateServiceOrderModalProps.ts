export type CreateServiceOrderModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        clientId: number,
        items: { productId: number; quantity: number }[]
    ) => void;
    isPending?: boolean;
};