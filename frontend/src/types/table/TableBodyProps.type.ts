import { Column } from "./Column.type";

export type TableBodyProps = {
    data: Record<string, any>[];
    columns: Column[];
};