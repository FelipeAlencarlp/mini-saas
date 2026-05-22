export type Column = {
    header: string;
    accessor: string;
    render?: (row: Record<string, any>) => React.ReactNode;
};