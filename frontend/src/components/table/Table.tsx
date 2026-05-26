import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { TableProps } from "@/types/table/TableProps.type";
import { TableSkeleton } from "./TableSkeleton";

export function Table<T>({
    columns,
    data,
    isLoading
}: TableProps<T>) {
    return (
        <div className="
            overflow-x-auto shadow-md mt-5
            sm:rounded-lg
        ">
            {isLoading ? 
                (
                    <TableSkeleton
                        columns={columns.length}
                        rows={6}
                    />
                )
            :
                (
                    <table className="
                        table-fixed w-full
                        border-collapse text-center
                    ">
                        <TableHead columns={columns}/>
                        <TableBody data={data} columns={columns}/>
                    </table>
                )
            }
        </div>
    );
}