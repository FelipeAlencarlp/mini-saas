import { ServiceOrderModal } from "../modal/ServiceOrderModal";
import { ServiceOrderClientData } from "./ServiceOrderClientData";
import { BaseCardServiceOrder } from "./BaseCardServiceOrder";
import { SelectProductServiceOrder } from "./SelectProductServiceOrder";
import { ProductsListServiceOrder } from "./ProductsListServiceOrder";
import { TotalsServiceOrder } from "./TotalsServiceOrder";
import {
    EditServiceOrderModalProps
} from "@/types/modal/service_orders/EditServiceOrderModalProps";
import {
    useEditServiceOrderModalActions
} from "@/hooks/service_orders/actions/useEditServiceOrderModalActions";

export function EditServiceOrderModal({
    serviceOrder,
    isOpen,
    onClose,
    onConfirm,
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
        handleSubmit,
        handleAddProduct,
        handleChangeQuantity,
        handleRemoveProductList,
    } = useEditServiceOrderModalActions({
        serviceOrder,
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <ServiceOrderModal
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
            items={items}
            optionTitle={['Criando...', 'Criar']}
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
        </ServiceOrderModal>
    );
}