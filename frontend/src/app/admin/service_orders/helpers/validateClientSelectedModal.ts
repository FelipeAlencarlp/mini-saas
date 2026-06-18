import {
    ServiceOrderClientModalProps
} from "@/types/dashboard/service_order";

export function validateClientSelectedModal({
    client,
}: ServiceOrderClientModalProps): { client: string } {
    const error: { client: string } = {
        client: ''
    };

    // Client
    if (!client) {
        error.client = 'Obrigatório selecionar um cliente';
    }

    return error;
}