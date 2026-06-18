import { UserProps } from "../dashboard/user";

export type ModalUserType =
    | { type: 'create' }
    | { type: 'edit'; user: UserProps }
    | { type: 'delete'; user: UserProps }
    | null;

export interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        name: string,
        email: string,
        password: string
    ) => void;
    isPending?: boolean;
}

export interface EditUserModalProps {
    user: UserProps | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        id: number,
        name: string,
        email: string
    ) => void;
    isPending?: boolean;
}

// helper
export interface UserModalProps {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface ValidationUserProps {
    name: string;
    email: string;
}

export interface ValidationUserErrorsProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}