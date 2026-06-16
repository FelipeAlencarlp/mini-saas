import ReactPaginate from 'react-paginate';
import { PaginationProps } from "@/types/page";

export function Pagination({
    page,
    pageCount,
    onPageChange
}: PaginationProps) {
    return (
        <div className="flex justify-end mt-6">
            <ReactPaginate
                previousLabel="Anterior"
                nextLabel="Próximo"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={onPageChange}
                forcePage={page - 1}

                containerClassName="
                    flex items-center gap-2
                "

                pageClassName="
                    w-auto h-auto
                    cursor-pointer
                    text-xs
                "

                pageLinkClassName="
                    flex items-center justify-center
                    w-full h-full
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    hover:bg-blue-500
                    hover:text-white
                    transition
                    px-2 py-1
                "

                activeLinkClassName="
                    bg-blue-500 text-white
                    border-blue-500
                "

                previousClassName="
                    w-auto h-auto
                    text-xs
                "

                nextClassName="
                    w-auto h-auto
                    text-xs
                "

                previousLinkClassName="
                    flex items-center justify-center
                    w-full h-full
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    hover:bg-blue-500
                    hover:text-white
                    transition
                    px-2 py-1
                    cursor-pointer
                "

                nextLinkClassName="
                    flex items-center justify-center
                    w-full h-full
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    hover:bg-blue-500
                    hover:text-white
                    transition
                    px-2 py-1
                    cursor-pointer
                "

                breakLinkClassName="
                    px-2 text-gray-500
                "
            />
        </div>
    );
}