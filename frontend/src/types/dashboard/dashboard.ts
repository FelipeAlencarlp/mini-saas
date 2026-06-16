import { UserProps } from "../user";

// CARD
export interface CardProps {
    title: string;
    span1: string;
    span2?: number;
}

export interface DashboardDataProps {
    totalOrders: number;
    totalEndedOrders: number;
    totalSoldOrders: number;
    productName: string;
    quantitySold: number;
    clientName: string;
    quantityOrders: number;
}

export interface DashboardCardsProps {
    data?: DashboardDataProps;
    isLoading: boolean;
}

// REQUESTS
export interface ProductMostSoldedProps {
    productName: string;
    quantitySold: number;
}

export interface clientMostOrdersProps {
    clientName: string;
    quantityOrders: number;
}

// TitlePage
export interface TitlePageProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

// Dashboard Layout (HEADER)
export interface HeaderProps {
    isLoading?: boolean;
    onOpenMenu: () => void;
    onOpenProfile: () => void;
}

// (SIDEBAR)
export interface SidebarProps {
    open: boolean;
    isLoading?: boolean;
    onClose: () => void;
}

// (PROFILE DRAWER)
export interface ProfileDrawerProps {
    open: boolean;
    user?: UserProps;
    isLoading: boolean;
    onClose: () => void;
}