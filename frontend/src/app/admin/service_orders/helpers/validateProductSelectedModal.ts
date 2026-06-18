export function validateProductSelectedModal({
    productId,
}: { productId: string }): { productId: string } {
    const error: { productId: string } = {
        productId: ''
    };

    // productId
    if (productId == '') {
        error.productId = 'Escolha um produto primeiro';
    }

    return error;
}