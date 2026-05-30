import { useEffect, useRef, useState } from "react";
import {
    validateProductModal
} from "@/app/admin/products/helpers/validateProductModal";
import {
    CreateProductModalProps
} from "@/types/modal/products/CreateProductModalProps";

export function useCreateProductModalActions({
    isOpen,
    onClose,
    onConfirm
}: CreateProductModalProps) {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('0.01');
    const [quantity, setQuantity] = useState<string>('1');

    const [errors, setErrors] = useState({
        name: '',
        price: '',
        quantity: ''
    });

    const nameInputRef = useRef<HTMLInputElement>(null);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const quantityInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setPrice('0.01');
            setQuantity('1');
        }
    }, [isOpen]);

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
        setName('');
        setPrice('0.01');
        setQuantity('1');

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