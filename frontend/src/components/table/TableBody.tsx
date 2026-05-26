import { TableBodyProps } from "@/types/table/TableBodyProps.type";
import { TableRow } from "./TableRow";

export function TableBody<T>({ data, columns }: TableBodyProps<T>) {
    return (
        <tbody className="
            text-gray-800 divide-y divide-gray-200
            max-md:flex max-md:flex-col
            max-md:divide-y-0
            max-md:gap-5
        ">
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