import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { PriceInput } from "../form/PriceInput";
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
        quantity,
        errors,
        nameInputRef,
        priceInputRef,
        quantityInputRef,
        setName,
        setPrice,
        setQuantity,
        setErrors,
        handleSubmit,
        handleClose
    } = useEditProductModalActions({
        product,
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <Modal
            title="Editar Produto"
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
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
    );
}