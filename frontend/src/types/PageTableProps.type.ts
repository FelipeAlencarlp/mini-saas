import { Column } from "./table/Column.type";

export type PageTableProps<T> = {
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
};