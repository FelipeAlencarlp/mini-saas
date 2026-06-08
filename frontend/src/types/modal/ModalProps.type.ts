import { Item } from "../dashboard/service_orders/Item.type";

export type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    isPending?: boolean;
    optionTitle?: string[];
    items?: Item[];
    onClose: () => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};