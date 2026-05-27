import { Column } from "./Column.type";

export type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    page: number;
    pageCount: number;

    handlePageClick: (event: {
        selected: number;
    }) => void;
};