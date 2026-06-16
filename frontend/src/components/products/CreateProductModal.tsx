import { Modal } from "../modal/Modal";
import { Input } from "../form/Input";
import { PriceInput } from "../form/PriceInput";
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
    } = useCreateProductModalActions({
        isOpen,
        onClose,
        onConfirm
    });

    return (
        <Modal
            title="Criar Produto"
            isOpen={isOpen}
            onClose={handleClose}
            onClick={handleSubmit}
            isPending={isPending}
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
    );
}