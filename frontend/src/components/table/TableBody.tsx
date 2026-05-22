import { TableBodyProps } from "@/types/table/TableBodyProps.type";
import { TableRow } from "./TableRow";

export function TableBody({ data, columns }: TableBodyProps) {
    return (
        <tbody className="text-gray-800">
            {data.map((item, index) => (
                <TableRow
                    key={index}
                    row={item}
                    columns={columns}
                />
            ))}
        </tbody>
    );
}