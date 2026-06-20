import { Button } from "../form/Button";
import { HiOutlineTrash } from "react-icons/hi2";
import { Input } from "../form/Input";
import { ProductsListProps } from "@/types/dashboard/service_order";

export function ProductsListServiceOrder({
    items,
    handleChangeQuantity,
    handleRemoveProductList
}: ProductsListProps) {
    return (
        <>
            {items.length > 0 && (
                <div
                    className="
                        flex flex-col
                        w-full border-t mt-2
                        border-gray-200
                    "
                >
                    <p className="
                        text-center pt-4 text-gray-700
                        text-xs font-semibold
                    ">
                        PRODUTOS ADICIONADOS
                    </p>

                    {items?.map(item => (
                        <div
                            key={item.product.id}
                            className="
                                w-full relative
                                border border-gray-200
                                rounded-lg
                                mt-4 p-4
                                shadow-sm
                            "
                        >
                            <Button
                                onClick={() =>
                                    handleRemoveProductList(item.product.id)
                                }
                                title="Remover produto"
                                className="
                                    absolute mb-3
                                    top-3 right-3
                                    text-red-500
                                    hover:text-red-700
                                    transition-colors
                                "
                            >
                                <HiOutlineTrash size={18} />
                            </Button>

                            <div
                                className="
                                    flex flex-col
                                    sm:flex-row
                                    sm:items-center
                                    gap-4 pr-20
                                "
                            >
                                <div className="flex-1">
                                    <p
                                        className="
                                            text-gray-500
                                            font-semibold
                                            wrap-break-word
                                            flex md:flex-row flex-col
                                            md:gap-1
                                        "
                                    >
                                        NOME:
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
                                            flex md:flex-row flex-col
                                            md:gap-1
                                        "
                                    >
                                        PREÇO:
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

                                <div className="w-full sm:w-32">
                                    <Input
                                        label="Quantidade"
                                        bgLabel="bg-gray-300"
                                        id={`quantity-${item.product.id}`}
                                        name="quantity"
                                        inputMode="numeric"
                                        value={item.quantity}
                                        min={1}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g, ''
                                                );

                                            handleChangeQuantity(
                                                item.product.id,
                                                value
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}