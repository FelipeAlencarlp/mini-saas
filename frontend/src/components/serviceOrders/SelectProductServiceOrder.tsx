import { forwardRef } from "react";
import { Button } from "../form/Button";
import {
    SelectProductProps
} from "@/types/dashboard/service_orders/SelectProduct.type";

export const SelectProductServiceOrder = forwardRef<
    HTMLSelectElement,
    SelectProductProps
>(({
    value,
    error,
    products,
    onChange,
    onClick
}, ref) => {
    return (
        <div
            className="
                flex gap-3
                md:items-start
                md:flex-row
                flex-col justify-center
                items-center
            "
        >
            <div className="flex flex-col w-full">
                <select
                    name="selectServiceOrder"
                    id="selectServiceOrder"
                    value={value}
                    ref={ref}
                    onChange={onChange}
                    className={`
                        w-full
                        rounded-lg
                        border border-gray-200
                        bg-gray-200
                        px-4 py-2 text-center
                        text-sm text-gray-700
                        shadow-sm
                        transition-all duration-200
                        focus:border-blue-500
                        focus:ring-2 focus:ring-blue-100
                        focus:outline-none
                        hover:border-gray-400
                        ${error
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-400 focus:border-blue-600'
                        }
                    `}
                >
                    <option value="" disabled>
                        Selecione um produto
                    </option>
                    {products?.map((product) => (
                        <option
                            value={product.id}
                            key={product.id}
                        >
                            {product.name}
                        </option>
                    ))}
                </select>

                {error && (
                    <span className="text-red-500 text-xs mt-1">
                        {error}
                    </span>
                )}
            </div>

            <Button
                title="Adicionar produto"
                onClick={onClick}
                className="
                    md:self-start w-full
                    md:w-30 p-1 rounded
                    bg-blue-500
                    text-white
                    hover:bg-blue-600
                "
            >
                Adicionar
            </Button>
        </div>
    );
});