import {
    ServiceOrderClientModalProps,
    ServiceOrderValidationClientErrors
} from "@/types/dashboard/service_order";

export function validateClientSelectedModal({
    client,
}: ServiceOrderClientModalProps): ServiceOrderValidationClientErrors {
    const error: ServiceOrderValidationClientErrors = {
        client: ''
    };

    // Client
    if (!client) {
        error.client = 'Obrigatório selecionar um cliente';
    }

    return error;
}