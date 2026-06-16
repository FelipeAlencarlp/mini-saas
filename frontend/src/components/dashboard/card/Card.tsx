import { CardProps } from "@/types/dashboard/dashboard";

export function Card({ title, span1, span2 }: CardProps) {
    return (
        <div className="
            flex flex-col box-border shadow-md
            items-center justify-center mt-4 md:mt-10 mx-5
            rounded-xl border-2 h-auto
            w-full max-w-60 border-gray-600
        ">
            <h1 className="
                text-white bg-gray-600 w-full
                h-full rounded-t-md text-center py-3
                font-semibold
            ">
                {title}
            </h1>
            
            <div className="flex flex-col items-center py-2">
                <span className="text-gray-600 text-xl">
                    {span1}
                </span>

                {span2 && (
                    <span className="text-gray-600 text-xl">
                        Quantidade: {span2}
                    </span>
                )}
            </div>
        </div>
    );
}