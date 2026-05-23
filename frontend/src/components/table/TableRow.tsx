import { TableRowProps } from "@/types/table/TableRowProps.type";

export function TableRow<T>({
    row,
    columns
}: TableRowProps<T>) {
    return (
        <tr
            className="
                md:border-b md:border-gray-500 transition-colors
                duration-200 hover:bg-gray-100
                odd:bg-gray-200 even:bg-gray-300
                max-md:block max-md:rounded-lg max-md:border
                max-md:border-gray-500
            "
        >
            {columns.map((column, index) => {
                const value = row[column.accessor as keyof T];

                const hasContent =
                    value !== undefined &&
                    value !== null &&
                    value !== "";

                return (
                    <td
                        key={String(column.accessor)}
                        className={`
                            p-3 max-md:block max-md:p-0
                            ${
                                !hasContent && !column.render
                                ? "max-md:hidden"
                                : ""
                            }
                        `}
                    >
                        <span className={`
                            hidden max-md:block text-md uppercase py-1
                            font-bold bg-gray-500 text-gray-200
                            ${index === 0 ? "rounded-t" : ""}
                        `}>
                            {column.header}
                        </span>

                        <div className="py-3 text-base md:py-0">
                            {column.render
                                ? column.render(row)
                                : String(value ?? '')
                            }
                        </div>
                    </td>
                ); 
            })}
        </tr>
    );
}