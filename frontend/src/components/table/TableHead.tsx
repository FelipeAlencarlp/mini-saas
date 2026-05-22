import { TableHeadProps } from "@/types/table/TableHeadProps";

export function TableHead({ columns }: TableHeadProps) {
    return (
        <thead className="bg-gray-500 text-gray-200">
            <tr>
                {columns.map((column) => (
                    <th className="p-4" key={column.accessor}>
                        {column.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}