import {
    ViewServiceOrderModalProps
} from "@/types/modal/service_orders/ViewServiceOrderModalProps";
import {
    useViewServiceOrderModalActions
} from "@/hooks/service_orders/actions/useViewServiceOrderModalActions";
import { BaseCardServiceOrder } from "./BaseCardServiceOrder";
import { ServiceOrderClientData } from "./ServiceOrderClientData";
import { BaseServiceOrderModal } from "./BaseServiceOrderModal";
import { TotalsServiceOrder } from "./TotalsServiceOrder";
import { ViewProductsListServiceOrder } from "./ViewProductsListServiceOrder";

export function ViewServiceOrderModal({
    serviceOrder,
    isOpen,
    onClose
}: ViewServiceOrderModalProps) {
    const {
        items,
        client,
        subtotal,
        quantityProduct,
        handleClose
    } = useViewServiceOrderModalActions({
        serviceOrder,
        isOpen,
        onClose
    });

    return (
        <BaseServiceOrderModal
            isOpen={isOpen}
            onClose={handleClose}
        >
            <div className="flex-1 overflow-auto px-6 pb-6">
                {/* Client Data */}
                <ServiceOrderClientData client={client}/>

                {/* Products */}
                <BaseCardServiceOrder titleP="PRODUTOS">
                    {/* Products List */}
                    <ViewProductsListServiceOrder items={items}/>
                </BaseCardServiceOrder>

                {/* Totals */}
                <TotalsServiceOrder
                    items={items}
                    subtotal={subtotal}
                    quantityProduct={quantityProduct}
                />
            </div>
        </BaseServiceOrderModal>
    );
}