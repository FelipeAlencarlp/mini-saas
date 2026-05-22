import { Column } from "./Column.type";

export type TableProps = {
    columns: Column[];
    data: Record<string, any>[];
};