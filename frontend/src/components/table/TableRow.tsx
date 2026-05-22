import { TableRowProps } from "@/types/table/TableRowProps.type";

export function TableRow({ row, columns }: TableRowProps) {
    return (
        <tr
            className="
                border-b border-gray-500 transition-colors
                duration-200 hover:bg-gray-100
                odd:bg-gray-200 even:bg-gray-300
            "
        >
            {columns.map((column) => (
                <td key={column.accessor} className="p-3">
                    {column.render
                        ? column.render(row)
                        : row[column.accessor]
                    }
                </td>
            ))}
        </tr>
    );
}