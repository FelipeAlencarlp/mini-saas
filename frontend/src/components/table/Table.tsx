import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { TableProps } from "@/types/table/TableProps.type";

export function Table<T>({ columns, data }: TableProps<T>) {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10 ">
            <table className="
                table-fixed w-full
                border-collapse text-center
            ">
                <TableHead columns={columns}/>
                <TableBody data={data} columns={columns}/>
            </table>
        </div>
    );
}