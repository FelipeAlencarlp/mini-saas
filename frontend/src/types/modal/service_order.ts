import { ItemProps, ServiceOrdersProps } from "@/types/dashboard/service_order";

export type ModalServiceOrdersType =
    | { type: 'create'; }
    | { type: 'view'; serviceOrder: ServiceOrdersProps }
    | { type: 'edit'; serviceOrder: ServiceOrdersProps }
    | { type: 'delete'; serviceOrder: ServiceOrdersProps }
    | null;

export interface ServiceOrderProps {
    children: React.ReactNode;
    action?: string | null;
    items?: ItemProps[];
    title?: string;
    isOpen: boolean;
    isPending?: boolean;
    optionTitle?: string[];
    setAction: (type: string | null) => void;
    onClose: () => void;
    onClick: () => void;
}

export interface ViewServiceOrderModalProps {
    serviceOrder: ServiceOrdersProps | null;
    isOpen: boolean;
    onClose: () => void;
}

export interface CreateServiceOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        clientId: number,
        items: {
            productId: number;
            quantity: number
        }[]
    ) => void;
    isPending?: boolean;
}

export interface EditServiceOrderModalProps {
    serviceOrder: ServiceOrdersProps | null;
    isOpen: boolean;
    isCancelPending?: boolean;
    isUpdatePending?: boolean;
    isFinishPending?: boolean;
    onClose: () => void;
    onCancel: (id: number) => void;
    onConfirm: (
        id: number,
        items: {
            productId: number;
            quantity: number
        }[]
    ) => void;
    onFinish: (id: number) => void;
}

export interface ServiceOrderModalWithButtonsProps {
    children: React.ReactNode;
    items?: ItemProps[];
    action: ActionType;
    title?: string;
    isOpen: boolean;
    optionTitle?: string[];
    optionTitle1?: string[];
    optionTitle2?: string[];
    isCancelPending?: boolean;
    isUpdatePending?: boolean;
    isFinishPending?: boolean;
    setAction: (type: ActionType) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export type ActionType = 'cancel' | 'update' | 'finish' | null;

export interface ConfirmActionModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    onClose: () => void;
    onConfirm: () => void;
}

export interface BaseServiceOrderModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}