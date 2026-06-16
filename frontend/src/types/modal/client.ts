import { ClientProps } from "@/types/dashboard/client";

export type ModalClientType =
    | { type: 'create' }
    | { type: 'edit'; client: ClientProps }
    | { type: 'delete'; client: ClientProps }
    | null;

export interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        name: string,
        email: string,
        phone: string
    ) => void;
    isPending?: boolean;
}

export interface EditModalProps {
    client: ClientProps | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        name: string,
        email: string,
        phone: string
    ) => void;
    isPending?: boolean;
}