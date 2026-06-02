type DeletableItem = {
    id: number;
    name?: string;
};

export type DeleteModalProps = {
    item?: DeletableItem | null;
    isOpen: boolean;
    isPending: boolean;
    onClose: () => void;
    onConfirm: (id: number) => void;
};