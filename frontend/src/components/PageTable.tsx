import { TitlePage } from "@/components/dashboard/titlePage/TitlePage";
import { Table } from "@/components/table/Table";
import {
    SearchAndButtonHeaderPage
} from "@/components/searchAndButton/SearchAndButtonHeaderPage";
import { TableSkeleton } from "@/components/table/TableSkeleton";
import { PageTableProps } from "@/types/page";

export function PageTable<T>({
    titlePage,
    isLoading = false,
    isFetching = false,
    search,
    columns,
    data,
    page,
    pageCount,
    label,
    title,
    descriptionButton,
    onSearch,
    onClick,
    handlePageClick
}: PageTableProps<T>) {
    return (
        <>
            {/* Header */}
            <TitlePage isLoading={isLoading}>
                {titlePage}
            </TitlePage>

            {/* Button and Search */}
            <SearchAndButtonHeaderPage
                label={label}
                title={title}
                descriptionButton={descriptionButton}
                search={search}
                isLoading={isLoading}
                onSearch={onSearch}
                onClick={onClick}
            />

            {/* Table */}
            {isLoading
                ?
                    <TableSkeleton
                        columns={columns.length}
                        rows={6}
                    />
                :
                    <Table
                        columns={columns}
                        data={data}
                        isLoading={isFetching}
                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                        page={page}
                    />
            }
        </>
    );
}