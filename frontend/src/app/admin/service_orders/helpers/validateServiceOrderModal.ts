interface ServiceOrderModalProps {
    clientId: number | null;
    items: number[];
}

interface ValidationErrors {
    clientId: string;
    items: string;
}

export function validateServiceOrderModal({
    clientId,
    items
}: ServiceOrderModalProps): ValidationErrors {
    const errors: ValidationErrors = {
        clientId: '',
        items: ''
    };

    // Client
    if (!clientId) {
        errors.clientId = 'Obrigatório selecionar um cliente';
    }

    // Items
    if (items.length < 1) {
        errors.items = 'Obrigatório selecionar pelo menos 1 produto';
    }

    return errors;
}