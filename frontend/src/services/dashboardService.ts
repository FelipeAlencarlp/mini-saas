import { api } from "@/services/api";
import { clientMostOrders } from "@/types/dashboard/ClientMostOrders.type";
import { ProductMostSolded } from "@/types/dashboard/ProductMostSolded.type";

export async function getTotalOrders(): Promise<number> {
    const response = await api.get('/dashboard/total-orders');
    const { total } = response.data.data;

    return total;
}

export async function getTotalEndedOrders(): Promise<number> {
    const response = await api.get('/dashboard/total-ended-orders');
    const { totalEnded } = response.data.data;

    return totalEnded;
}

export async function getTotalSoldOrders(): Promise<number> {
    const response = await api.get('/dashboard/total-sold-orders');
    const { valueTotalSold } = response.data.data;

    return valueTotalSold;
}

export async function getProductMostSolded(): Promise<ProductMostSolded> {
    const response = await api.get('/dashboard/product-most-sold');
    const { productName, quantitySold } = response.data.data;

    return { productName, quantitySold };
}

export async function getClientMostOrders(): Promise<clientMostOrders> {
    const response = await api.get('/dashboard/client-most-orders');
    const { clientName, quantityOrders } = response.data.data;

    return { clientName, quantityOrders };
}