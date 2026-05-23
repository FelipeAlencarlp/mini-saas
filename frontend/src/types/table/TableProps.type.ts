import { Column } from "./Column.type";

export type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
};