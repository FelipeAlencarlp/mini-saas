type ColumnFormat = "currency" | "number" | "text";

export interface Column<T> {
    header: string;
    accessor: keyof T | string;
    render?: (row: T) => React.ReactNode;
    format?: ColumnFormat;
}

export interface TableHeadProps<T> {
    columns: Column<T>[];
}

export interface TableBodyProps<T> {
    data: T[];
    columns: Column<T>[];
}

export interface TableRowProps<T> {
    row: T;
    columns: Column<T>[];
}

export interface TableSkeletonProps {
    columns: number;
    rows?: number;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    page: number;
    pageCount: number;

    handlePageClick: (event: {
        selected: number;
    }) => void;
}

// Button
type TypeButton = 'edit' | 'delete' | 'view';

export interface TableButtonProps {
    title: string;
    type: TypeButton;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
