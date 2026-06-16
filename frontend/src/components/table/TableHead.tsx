import { TableHeadProps } from "@/types/table";

export function TableHead<T>({ columns }: TableHeadProps<T>) {
    return (
        <thead className="
            bg-gray-500 text-gray-200
            uppercase max-md:hidden
        ">
            <tr>
                {columns.map((column, index) => (
                    <th className="p-4" key={index}>
                        {column.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}