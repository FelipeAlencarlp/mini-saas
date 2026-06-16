import { ServiceOrderModalWithButtons } from "./ServiceOrderModalWithButtons";
import { ServiceOrderClientData } from "./ServiceOrderClientData";
import { BaseCardServiceOrder } from "./BaseCardServiceOrder";
import { SelectProductServiceOrder } from "./SelectProductServiceOrder";
import { ProductsListServiceOrder } from "./ProductsListServiceOrder";
import { TotalsServiceOrder } from "./TotalsServiceOrder";
import { EditServiceOrderModalProps } from "@/types/modal/service_order";
import {
    useEditServiceOrderModalActions
} from "@/hooks/service_orders/actions/useEditServiceOrderModalActions";

export function EditServiceOrderModal({
    serviceOrder,
    isOpen,
    onClose,
    onCancel,
    onConfirm,
    onFinish,
    isPending
}: EditServiceOrderModalProps) {
    const {
        items,
        client,
        products,
        subtotal,
        productId,
        productIdError,
        quantityProduct,
        productIdInputRef,
        setProductId,
        setProductIdError,
        handleClose,
        handleAddProduct,
        handleUpdateOrder,
        handleCancelOrder,
        handleFinishOrder,
        handleChangeQuantity,
        handleRemoveProductList,
    } = useEditServiceOrderModalActions({
        serviceOrder,
        isOpen,
        onClose,
        onCancel,
        onConfirm,
        onFinish
    });

    return (
        <ServiceOrderModalWithButtons
            isOpen={isOpen}
            onClose={handleClose}
            onCancelOrder={handleCancelOrder}
            onUpdateOrder={handleUpdateOrder}
            onFinishOrder={handleFinishOrder}
            isPending={isPending}
            items={items}
            optionTitle={['Cancelando...', 'Cancelar']}
            optionTitle1={['Atualizando...', 'Atualizar']}
            optionTitle2={['Finalizando...', 'Finalizar']}
        >
            {/* Client Data */}
            <ServiceOrderClientData client={client}/>

            {/* Products */}
            <BaseCardServiceOrder titleP="PRODUTOS">
                {/* Select Product */}
                <SelectProductServiceOrder
                    value={productId}
                    ref={productIdInputRef}
                    products={products?.data || []}
                    error={productIdError.productId}
                    onChange={(e) => {
                        setProductId(e.target.value);
                        setProductIdError(() => ({ productId: '' }))
                    }}
                    onClick={handleAddProduct}
                />

                {/* Products List */}
                <ProductsListServiceOrder
                    items={items}
                    handleChangeQuantity={handleChangeQuantity}
                    handleRemoveProductList={handleRemoveProductList}
                />
            </BaseCardServiceOrder>

            {/* Totals */}
            <TotalsServiceOrder
                items={items}
                subtotal={subtotal}
                quantityProduct={quantityProduct}
            />
        </ServiceOrderModalWithButtons>
    );
}