import { BaseCardProps } from "@/types/dashboard/service_order";

export function BaseCardServiceOrder({
    children,
    titleP,
    className
}: BaseCardProps) {
    return (
        <>
            <p
                className="
                    mt-6 bg-gray-300 rounded-t-lg
                    w-full md:w-54 border-b border-gray-200
                    text-center text-xs pt-2 pb-1
                    text-gray-700 font-semibold
                "
            >
                {titleP}
            </p>

            <div
                className={`
                    w-full bg-gray-300
                    shadow-lg p-4 md:p-6
                    rounded-b-lg
                    md:rounded-lg
                    md:rounded-tl-none
                    flex flex-col
                    ${className ?? ""}
                    gap-3 md:gap-5
                    ss-start md:ss-center
                `}
            >
                { children }
            </div>
        </>
    );
}