import { ViewProductsListProps } from "@/types/dashboard/service_order";

export function ViewProductsListServiceOrder({
    items
}: ViewProductsListProps) {
    return (
        <div
            className="
                flex flex-col
                w-full
            "
        >
            {items?.map(item => (
                <div
                    key={item.product.id}
                    className="
                        w-full relative
                        border border-gray-200
                        rounded-lg mt-2 p-4 shadow-sm
                        flex flex-col
                        md:flex-row
                        md:items-center
                        md:justify-around
                    "
                >
                    <div className="">
                        <p
                            className="
                                text-gray-500
                                font-semibold
                                wrap-break-word
                            "
                        >
                            NOME:{' '}
                            <span
                                className="
                                    font-normal text-gray-600
                                "
                            >
                                {item.product.name}
                            </span>
                        </p>

                        <p
                            className="
                                text-gray-500
                                font-semibold
                            "
                        >
                            PREÇO:{' '}
                            <span
                                className="
                                    font-normal text-gray-600
                                "
                            >
                                {item.product.price.toLocaleString(
                                    'pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }
                                )}
                            </span>
                        </p>
                    </div>

                    <div className="">
                        <p
                            className="
                                text-gray-500
                                font-semibold
                            "
                        >
                            QUANTIDADE:{' '}
                            <span
                                className="
                                    font-normal text-gray-600
                                "
                            >
                                {item.quantity}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}