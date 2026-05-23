export type Column<T> = {
    header: string;
    accessor: keyof T | string;
    render?: (row: T) => React.ReactNode;
};