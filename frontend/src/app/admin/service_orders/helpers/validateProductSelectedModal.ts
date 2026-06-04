interface ServiceOrderModalProps {
    productId: string;
}

interface ValidationErrors {
    productId: string
}

export function validateProductSelectedModal({
    productId,
}: ServiceOrderModalProps): ValidationErrors {
    const error: ValidationErrors = {
        productId: ''
    };

    // productId
    if (productId == '') {
        error.productId = 'Escolha um produto primeiro';
    }

    return error;
}