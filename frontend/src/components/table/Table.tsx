import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { Spinner } from "../Spinner";
import { Pagination } from "../pagination";
import { TableProps } from "@/types/table";

export function Table<T>({
    columns,
    data,
    isLoading = false,
    page,
    pageCount,
    handlePageClick,
}: TableProps<T>) {
    return (
        <>
            <div className="
                relative w-full
                overflow-x-auto
                shadow-md mt-5 sm:rounded-lg
            ">
                {isLoading && (
                    <div className="
                        absolute inset-0 z-10
                        flex items-center justify-center
                        bg-white/60
                    ">
                        <Spinner size={32} />
                    </div>
                )}
                
                <table className="
                    w-full text-center
                    border-collapse
                ">
                    <TableHead columns={columns}/>
                    <TableBody
                        data={data}
                        columns={columns}
                    />
                </table>
            </div>
            
            {pageCount > 1 && (
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                />
            )}
        </>
    );
}