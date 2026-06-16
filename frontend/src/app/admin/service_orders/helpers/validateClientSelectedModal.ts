import { ClientProps } from "@/types/dashboard/client";

interface ServiceOrderModalProps {
    client: ClientProps | null;
}

interface ValidationErrors {
    client: string
}

export function validateClientSelectedModal({
    client,
}: ServiceOrderModalProps): ValidationErrors {
    const error: ValidationErrors = {
        client: ''
    };

    // Client
    if (!client) {
        error.client = 'Obrigatório selecionar um cliente';
    }

    return error;
}