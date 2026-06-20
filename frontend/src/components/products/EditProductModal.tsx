import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { PriceInput } from "../form/PriceInput";
import { ConfirmActionModal } from "../modal/ConfirmActionModal";
import { EditProductModalProps } from "@/types/modal/product";
import {
    useEditProductModalActions
} from "@/hooks/products/actions/useEditProductModalActions";

export function EditProductModal({
    product,
    isOpen,
    onClose,
    onConfirm,
    isPending
}: EditProductModalProps) {
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
        setAction,
        setErrors,
        setQuantity,
        handleClose,
        handleSubmit,
        handleConfirmEdit
    } = useEditProductModalActions({
        product,
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
                title="Editar Produto"
                optionTitle={['Salvando...', 'Salvar']}
            >
                <Input
                    label="Nome"
                    bgLabel="bg-gray-200"
                    ref={nameInputRef}
                    id="name-edit-product-modal"
                    name="name"
                    value={name}
                    error={errors.name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({
                            ...prev,
                            name: '',
                        }));
                    }}
                />

                <PriceInput
                    label="Preço"
                    bgLabel="bg-gray-200"
                    ref={priceInputRef}
                    id="price-edit-product-modal"
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
                    id="quantity-edit-product-modal"
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
                isOpen={action === 'edit'}
                onClose={() => setAction(null)}
                onConfirm={handleConfirmEdit}
                title="Atenção"
                description="Tem certeza que deseja editar esse produto?"
                confirmText="Confirmar"
            />
        </>
    );
}