import { EmpytPage } from "./EmpytPage";
import { PageTableProps } from "@/types/page";
import { TitlePage } from "@/components/dashboard/titlePage/TitlePage";
import { Table } from "@/components/table/Table";
import {
    SearchAndButtonHeaderPage
} from "@/components/searchAndButton/SearchAndButtonHeaderPage";
import { TableSkeleton } from "@/components/table/TableSkeleton";

export function PageTable<T>({
    text,
    data,
    page,
    label,
    title,
    search,
    columns,
    titlePage,
    pageCount,
    isLoading = false,
    isFetching = false,
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

            {data
                ? (
                    <>
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
                  )
                : <EmpytPage text={text}/>
            }
        </>
    );
}