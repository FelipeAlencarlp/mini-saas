import { Item } from "../dashboard/service_orders/Item.type";

export type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPending?: boolean;
    optionTitle?: string[];
    optionTitle2?: string[];
    items?: Item[];
};