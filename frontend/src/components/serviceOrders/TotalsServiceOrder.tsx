import { TotalsProps } from "@/types/dashboard/service_orders/TotalsProps.type";
import { BaseCardServiceOrder } from "./BaseCardServiceOrder";

export function TotalsServiceOrder({
    items,
    subtotal,
    quantityProduct
}: TotalsProps) {
    return (
        <>
            {items.length > 0 && (
                <BaseCardServiceOrder titleP="TOTAIS">
                    <div
                        className="
                            flex flex-col
                            md:flex-row md:justify-around
                        "
                    >
                        <p className="text-gray-400 font-semibold">
                            SUBTOTAL:{' '}
                            <span className="font-normal text-gray-500">
                                {
                                    subtotal.toLocaleString(
                                        'pt-BR',
                                        {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }
                                    )
                                }
                            </span>
                        </p>

                        <p className="text-gray-400 font-semibold">
                            PRODUTOS:{' '}
                            <span className="font-normal text-gray-500">
                                {quantityProduct}
                            </span>
                        </p>
                    </div>
                </BaseCardServiceOrder>
            )}
        </>
    );
}