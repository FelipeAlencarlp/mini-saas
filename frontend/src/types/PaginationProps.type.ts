export type PaginationProps = {
    page: number;
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
};