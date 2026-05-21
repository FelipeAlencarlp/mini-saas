"use client";

import { useQuery } from "@tanstack/react-query";
import {
    getTotalOrders,
    getTotalEndedOrders,
    getTotalSoldOrders,
    getProductMostSolded,
    getClientMostOrders,
} from "@/services/dashboardService";
import { Card } from "./Card";
import { CardSkeleton } from "./CardSkeleton";

export default function DashboardCards() {
    async function getDashboardData() {
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

    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    });

    if (error) console.log(error);

    const totalSoldTransformed =
        data?.totalSoldOrders.toFixed(2).replace('.', ',');

    const cards = [
        { title: 'TOTAL ORDENS', span1: data?.totalOrders.toString() },
        { title: 'TOTAL FINALIZADAS', span1: data?.totalEndedOrders.toString() },
        { title: 'VALOR VENDIDO R$', span1: totalSoldTransformed },
        {
            title: 'PRODUTO MAIS VENDIDO',
            span1: data?.productName,
            span2: data?.quantitySold
        },
        {
            title: 'CLIENTE COM MAIS ORDENS',
            span1: data?.clientName,
            span2: data?.quantityOrders
        },
    ];

    return (
        <div className="
            flex flex-col items-center gap-4 mb-4 md:mb-0
            md:flex-row md:flex-wrap md:items-start
        ">
            {isLoading
                ? Array.from({ length: 4}).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : cards.map((item) => (
                    <Card
                        key={item.title}
                        title={item.title}
                        span1={item.span1 ?? ''}
                        span2={item.span2}
                    />
                ))
            }
        </div>
    );
}