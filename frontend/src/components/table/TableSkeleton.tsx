import { TableSkeletonProps } from "@/types/table";

export function TableSkeleton({
    columns,
    rows = 5
}: TableSkeletonProps) {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="
                    table-fixed w-full
                    border-collapse text-center
                    animate-pulse
                "
            >
                <thead className="
                        bg-gray-300 uppercase
                        max-md:hidden
                    "
                >
                    <tr>
                        {Array.from({length: columns}).map((_, index) => (
                            <th
                                key={index}
                                className="p-4"
                            >
                                <div className="
                                        h-4 bg-gray-400
                                        rounded w-3/4 mx-auto
                                    "
                                />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="
                        divide-y divide-gray-200
                        max-md:flex max-md:flex-col
                        max-md:gap-4 max-md:divide-y-0
                    "
                >
                    {Array.from({
                        length: rows
                    }).map((_, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="
                                odd:bg-gray-200
                                even:bg-gray-300

                                max-md:block
                                max-md:rounded-lg
                                max-md:border
                                max-md:border-gray-400
                            "
                        >
                            {Array.from({length: columns}).map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="p-3 max-md:block"
                                >
                                    <div className="
                                            h-5 bg-gray-400
                                            rounded w-5/6
                                            mx-auto
                                        "
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}