import { useEffect, useRef, useState } from "react";
import {
    EditProductModalProps
} from "@/types/modal/products/EditProductModalProps";
import {
    validateProductModal
} from "@/app/admin/products/helpers/validateProductModal";

export function useEditProductModalActions({
    product,
    isOpen,
    onClose,
    onConfirm
}: EditProductModalProps) {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const [errors, setErrors] = useState({
        name: '',
        price: '',
        quantity: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const quantityInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (isOpen && product) {
            setId(product.id);
            setName(product.name);
            setPrice(String(product?.price));
            setQuantity(String(product?.quantity));
        }
    }, [isOpen, product]);

    function handleSubmit() {
        const validationErrors = validateProductModal({
            name,
            price,
            quantity
        });

        setErrors(validationErrors);

        if (validationErrors.name) {
            nameInputRef.current?.focus();
            return;
        }

        if (validationErrors.price) {
            priceInputRef.current?.focus();
            return;
        }

        if (validationErrors.quantity) {
            quantityInputRef.current?.focus();
            return;
        }

        onConfirm(
            id,
            name.trim(),
            Number(
                price
                    .replace(/\./g, '')
                    .replace(',', '.')
            ),
            Number(quantity)
        );
    }

    function handleClose() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setErrors({
            name: '',
            price: '',
            quantity: ''
        });
    }

    return {
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
    };
}