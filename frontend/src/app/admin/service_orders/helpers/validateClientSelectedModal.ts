import { ClientType } from "@/types/dashboard/clients/Client.type";

interface ServiceOrderModalProps {
    client: ClientType | null;
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