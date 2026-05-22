import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";
import { TableProps } from "@/types/table/TableProps.type";

export function Table({ columns, data }: TableProps) {
    return (
        <table className="
            table-fixed mt-10 w-full
            border-collapse text-center
        ">
            <TableHead columns={columns}/>
            <TableBody data={data} columns={columns}/>
        </table>
    );
}