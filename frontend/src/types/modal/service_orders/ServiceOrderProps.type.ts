import { Item } from "@/types/dashboard/service_orders/Item.type";

export type ServiceOrderProps = {
    children: React.ReactNode;
    items?: Item[];
    title?: string;
    isOpen: boolean;
    isPending?: boolean;
    optionTitle?: string[];
    onClose: () => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};