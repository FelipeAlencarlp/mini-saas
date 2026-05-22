import { Column } from "./Column.type";

export type TableRowProps = {
    row: Record<string, any>;
    columns: Column[];
};