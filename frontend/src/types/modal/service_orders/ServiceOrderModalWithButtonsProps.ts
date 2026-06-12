import { Item } from "@/types/dashboard/service_orders/Item.type";

export type ServiceOrderModalWithButtonsProps = {
    children: React.ReactNode;
    items?: Item[];
    title?: string;
    isOpen: boolean;
    isPending?: boolean;
    optionTitle?: string[];
    optionTitle1?: string[];
    optionTitle2?: string[];
    onClose: () => void;
    onCancelOrder?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onUpdateOrder?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onFinishOrder?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};