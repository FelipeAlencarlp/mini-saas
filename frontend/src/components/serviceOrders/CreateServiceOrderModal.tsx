import { ServiceOrderClientData } from "./ServiceOrderClientData";
import { BaseCardServiceOrder } from "./BaseCardServiceOrder";
import { SelectProductServiceOrder } from "./SelectProductServiceOrder";
import { ProductsListServiceOrder } from "./ProductsListServiceOrder";
import { TotalsServiceOrder } from "./TotalsServiceOrder";
import { Modal } from "../modal/Modal";
import { ServiceOrderModal } from "./ServiceOrderModal";
import { SearchInput } from "../form/SearchInput";
import { CreateServiceOrderModalProps } from "@/types/modal/service_order";
import {
    useCreateServiceOrderModalActions
} from "@/hooks/service_orders/actions/useCreateServiceOrderModalActions";

export function CreateServiceOrderModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateServiceOrderModalProps) {
    const {
        step,
        items,
        client,
        search,
        clients,
        products,
        subtotal,
        productId,
        clientError,
        isOpenSearch,
        productIdError,
        clientInputRef,
        quantityProduct,
        productIdInputRef,
        setClient,
        setSearch,
        setProductId,
        setClientError,
        setProductIdError,
        handleClose,
        handleSubmit,
        handleAdvance,
        setIsOpenSearch,
        handleAddProduct,
        handleCloseClient,
        handleChangeQuantity,
        handleRemoveProductList,
    } = useCreateServiceOrderModalActions({
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <>
            {/* Select Client */}
            <Modal
                title="Escolher Cliente"
                isOpen={isOpen && step === 'client'}
                onClose={handleCloseClient}
                onClick={handleAdvance}
                isPending={isPending}
                optionTitle={['Avançando...', 'Avançar']}
            >
                <SearchInput
                    label="Buscar cliente"
                    ref={clientInputRef}
                    value={search}
                    results={clients?.data ?? []}
                    isOpen={isOpenSearch}
                    error={clientError.client}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpenSearch(true);
                        setClientError(() => ({ client: '' }))
                    }}
                    onSelect={(client) => {
                        setClient(client);
                        setSearch(client.name);
                        setIsOpenSearch(false);
                    }}
                />
            </Modal>
            
            {/* Service Order */}
            <ServiceOrderModal
                isOpen={isOpen && step === 'serviceOrder'}
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
        </>
    );
}