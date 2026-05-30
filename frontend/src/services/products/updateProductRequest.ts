import { api } from "@/services/api";

interface UpdateRequest {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export async function updateProductRequest({
    id,
    name,
    price,
    quantity
}: UpdateRequest) {
    const response = await api.patch(`/products/${id}`, {
        name,
        price,
        quantity
    });

    return response.data.data;
}