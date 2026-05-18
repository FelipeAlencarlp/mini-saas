"use client";

import {
    getTotalOrders,
    getTotalEndedOrders,
    getTotalSoldOrders,
    getProductMostSolded,
    getClientMostOrders,
} from "@/services/dashboardService";
import Card from "./Card";
import { useEffect, useState } from "react";
import { ProductMostSolded } from "@/types/ProductMostSolded.type";

export default function DashboardCards({ refetchRef }: any) {
    const [totalOrders, setTotal] = useState<number>(0);
    const [totalEndedOrders, setTotalEndedOrders] = useState<number>(0);
    const [totalSoldOrders, setTotalSoldOrders] = useState<number>(0);
    const [productName, setProductName] = useState<string>('');
    const [producQuantity, setProductQuantity] = useState<number>();
    const [clientName, setClientName] = useState<string>('');
    const [clientQuantity, setClientQuantity] = useState<number>();

    async function fatchDashboard() {
        const totalOrders = await getTotalOrders();
        const totalEndedOrders = await getTotalEndedOrders();
        const totalSoldOrders = await getTotalSoldOrders();
        const { productName, quantitySold } = await getProductMostSolded();
        const { clientName, quantityOrders } = await getClientMostOrders();

        setTotal(totalOrders);
        setTotalEndedOrders(totalEndedOrders);
        setTotalSoldOrders(totalSoldOrders);
        setProductName(productName);
        setProductQuantity(quantitySold);
        setClientName(clientName);
        setClientQuantity(quantityOrders);
    }

    useEffect(() => {
        fatchDashboard();

        if (refetchRef) {
            refetchRef.current = fatchDashboard;
        }
    }, []);

    const totalSoldTransformed = totalSoldOrders.toFixed(2).replace('.', ',');

    const cards = [
        { title: 'TOTAL ORDENS', result: totalOrders.toString() },
        { title: 'TOTAL FINALIZADAS', result: totalEndedOrders.toString() },
        { title: 'VALOR VENDIDO R$', result: totalSoldTransformed },
        { title: 'PRODUTO MAIS VENDIDO', result: productName, span2: producQuantity },
        { title: 'CLIENTE COM MAIS ORDENS', result: clientName, span2: clientQuantity },
    ];

    return (
        <div className="flex flex-auto flex-wrap">
            {cards.map((item) => {
                return (
                    <Card
                        key={item.title}
                        title={item.title}
                        span1={item.result}
                        span2={item.span2}
                    />
                );
            })}
        </div>
    );
}