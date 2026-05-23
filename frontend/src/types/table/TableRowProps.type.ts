import { Column } from "./Column.type";

export type TableRowProps<T> = {
    row: T;
    columns: Column<T>[];
};