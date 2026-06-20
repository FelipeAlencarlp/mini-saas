import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { PriceInput } from "../form/PriceInput";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
import { CreateProductModalProps } from "@/types/modal/product"; 
import {
    useCreateProductModalActions
} from "@/hooks/products/actions/useCreateProductModalActions";

export function CreateProductModal({
    isOpen,
    onClose,
    onConfirm,
    isPending
}: CreateProductModalProps) {
    const {
        name,
        price,
        action,
        errors,
        quantity,
        nameInputRef,
        priceInputRef,
        quantityInputRef,
        setName,
        setPrice,
        setErrors,
        setAction,
        setQuantity,
        handleClose,
        handleSubmit,
        handleConfirmCreate
    } = useCreateProductModalActions({
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <>
            <Modal
                isOpen={isOpen}
                isPending={isPending}
                onClose={handleClose}
                onClick={handleSubmit}
                title="Criar Produto"
                optionTitle={['Criando...', 'Criar']}
            >
                <Input
                    label="Nome"
                    bgLabel="bg-gray-200"
                    ref={nameInputRef}
                    id="name-create-product-modal"
                    name="name"
                    type="text"
                    value={name}
                    error={errors.name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({
                            ...prev,
                            name: ''
                        }));
                    }}
                />

                <PriceInput
                    label="Preço"
                    bgLabel="bg-gray-200"
                    ref={priceInputRef}
                    id="price-create-product-modal"
                    name="price"
                    value={price}
                    error={errors.price}
                    onChange={(e) => {
                        setPrice(e);
                        setErrors((prev) => ({
                            ...prev,
                            price: ''
                        }));
                    }}
                />

                <Input
                    label="Quantidade"
                    bgLabel="bg-gray-200"
                    ref={quantityInputRef}
                    id="quantity-create-product-modal"
                    name="quantity"
                    inputMode="numeric"
                    value={quantity}
                    min={1}
                    error={errors.quantity}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        
                        setQuantity(value);
                        setErrors((prev) => ({
                            ...prev,
                            quantity: ''
                        }));
                    }}
                />
            </Modal>

            <ConfirmActionModal
                isOpen={action === 'create'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmCreate}
                title="Atenção"
                description="Tem certeza que deseja criar esse produto?"
                confirmText="Confirmar"
            />
        </>
    );
}