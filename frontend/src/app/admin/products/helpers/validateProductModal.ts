import {
    ProductModalProps,
    ValidationErrors
} from "@/types/dashboard/product";

export function validateProductModal({
    name,
    price,
    quantity
}: ProductModalProps): ValidationErrors {
    const errors: ValidationErrors = {
        name: '',
        price: '',
        quantity: ''
    };

    // Name
    if (!name) {
        errors.name = 'Nome é obrigatório';
    } else if (name.length < 3) {
        errors.name = 'Nome deve ter no mínimo 3 caracteres.';
    }

    // Price
    if (!price) {
        errors.price = 'O preço é obrigatório';
    } else {
        const parsedPrice = Number(
            price
                .replace(/\./g, '')
                .replace(',', '.')
        );

        if (parsedPrice < 0.01) {
            errors.price = 'Preço mínimo é 0.01';
        }
    }

    // Quantity
    if (!quantity) {
        errors.quantity = 'A quantidade é obrigatória';
    } else if (Number(quantity) < 1) {
        errors.quantity = 'Quantidade mínima é 1'
    }

    return errors;
}