import { Column } from "./Column.type";

export type TableHeadProps<T> = {
    columns: Column<T>[];
};