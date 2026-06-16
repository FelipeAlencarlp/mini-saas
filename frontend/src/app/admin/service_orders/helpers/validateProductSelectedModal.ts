import {
    ServiceOrderProductModalProps,
    ServiceOrderValidationProductErrors
} from "@/types/dashboard/service_order";

export function validateProductSelectedModal({
    productId,
}: ServiceOrderProductModalProps): ServiceOrderValidationProductErrors {
    const error: ServiceOrderValidationProductErrors = {
        productId: ''
    };

    // productId
    if (productId == '') {
        error.productId = 'Escolha um produto primeiro';
    }

    return error;
}