export type ActionType = 'create' | 'edit' | null;

export interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    isPending?: boolean;
    optionTitle?: string[];
    onClose: () => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Delete Modal
interface DeletableItem {
    id: number;
    name?: string;
}

export interface DeleteModalProps {
    item?: DeletableItem | null;
    isOpen: boolean;
    isPending: boolean;
    onClose: () => void;
    onConfirm: (id: number) => void;
}