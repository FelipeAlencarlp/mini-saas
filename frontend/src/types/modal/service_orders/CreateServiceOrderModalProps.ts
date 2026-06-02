export type CreateServiceOrderModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        userId: number,
        clientId: number,
        items: number[]
    ) => void;
    isPending?: boolean;
};