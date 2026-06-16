import { Column } from "./table";

export interface PageTableProps<T> {
    titlePage: string;
    isLoading: boolean;
    isFetching: boolean;
    search: string;
    columns: Column<T>[]
    data: T[];
    page: number;
    pageCount: number;
    label: string;
    title?: string;
    descriptionButton?: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handlePageClick: (event: {
        selected: number;
    }) => void;
}

// pagination
export interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

// SearchAndButton
export interface SearchAndButtonProps {
    label: string;
    title?: string;
    descriptionButton?: string;
    search: string;
    isLoading?: boolean;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}