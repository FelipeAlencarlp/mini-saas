import {
    getTotalOrders,
    getTotalEndedOrders,
    getTotalSoldOrders,
    getProductMostSolded,
    getClientMostOrders,
} from "@/services/dashboard/dashboardService";

export async function getDashboardData() {
    const [
        totalOrders,
        totalEndedOrders,
        totalSoldOrders,
        productData,
        clientData,
    ] = await Promise.all([
        getTotalOrders(),
        getTotalEndedOrders(),
        getTotalSoldOrders(),
        getProductMostSolded(),
        getClientMostOrders(),
    ]);

    return {
        totalOrders,
        totalEndedOrders,
        totalSoldOrders,

        productName: productData.productName,
        quantitySold: productData.quantitySold,

        clientName: clientData.clientName,
        quantityOrders: clientData.quantityOrders
    };
}