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
    isCancelPending,
    isUpdatePending,
    isFinishPending,
    onClose,
    onCancel,
    onConfirm,
    onFinish,
}: EditServiceOrderModalProps) {
    const {
        items,
        client,
        action,
        products,
        subtotal,
        productId,
        productIdError,
        quantityProduct,
        productIdInputRef,
        setAction,
        setProductId,
        setProductIdError,
        handleClose,
        handleConfirm,
        handleAddProduct,
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
            items={items}
            isOpen={isOpen}
            action={action}
            setAction={setAction}
            onClose={handleClose}
            onConfirm={handleConfirm}
            isCancelPending={isCancelPending}
            isUpdatePending={isUpdatePending}
            isFinishPending={isFinishPending}
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