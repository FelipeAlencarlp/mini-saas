export type CreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        name: string,
        email: string,
        phone: string
    ) => void;
    isPending?: boolean;
};