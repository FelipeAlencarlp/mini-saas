import { ServiceOrderModal } from "../modal/ServiceOrderModal";
import { SearchInput } from "../form/SearchInput";
import {
    CreateServiceOrderModalProps
} from "@/types/modal/service_orders/CreateServiceOrderModalProps";
import {
    useCreateServiceOrderModalActions
} from "@/hooks/service_orders/actions/useCreateServiceOrderModalActions";
import { Modal } from "../modal/Modal";
import { ServiceOrderClientData } from "./ServiceOrderClientData";
import { ProductsServiceOrder } from "./ProductsServiceOrder";
import { SelectProductServiceOrder } from "./SelectProductServiceOrder";
import { ProductsListServiceOrder } from "./ProductsListServiceOrder";

export function CreateServiceOrderModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateServiceOrderModalProps) {
    const {
        clients,
        products,
        productId,
        items,
        client,
        search,
        isOpenSearch,
        clientError,
        productIdError,
        errors,
        clientInputRef,
        productIdInputRef,
        step,
        setErrors,
        setClientError,
        setProductIdError,
        setSearch,
        setClient,
        setProductId,
        setItems,
        setIsOpenSearch,
        handleAdvance,
        handleAddProduct,
        handleChangeQuantity,
        handleSubmit,
        handleCloseClient,
        handleClose,
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
                optionTitle={['Criando...', 'Criar']}
            >
                {/* Client Data */}
                <ServiceOrderClientData client={client}/>

                {/* Products */}
                <ProductsServiceOrder>
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
                    />
                </ProductsServiceOrder>
            </ServiceOrderModal>
        </>
    );
}