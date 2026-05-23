import { Column } from "./Column.type";

export type TableBodyProps<T> = {
    data: T[];
    columns: Column<T>[];
};