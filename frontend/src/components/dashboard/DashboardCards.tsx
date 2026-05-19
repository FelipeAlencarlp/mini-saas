"use client";

import { useEffect, useState } from "react";
import {
    getTotalOrders,
    getTotalEndedOrders,
    getTotalSoldOrders,
    getProductMostSolded,
    getClientMostOrders,
} from "@/services/dashboardService";
import Card from "./Card";
import { CardSkeleton } from "./CardSkeleton";

export default function DashboardCards() {
    const [totalOrders, setTotal] = useState<number>(0);
    const [totalEndedOrders, setTotalEndedOrders] = useState<number>(0);
    const [totalSoldOrders, setTotalSoldOrders] = useState<number>(0);
    const [productName, setProductName] = useState<string>('');
    const [producQuantity, setProductQuantity] = useState<number>(0);
    const [clientName, setClientName] = useState<string>('');
    const [clientQuantity, setClientQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

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
        async function loadData() {
            try {
                setLoading(true);
                await fatchDashboard();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
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
            {loading
                ? Array.from({ length: 4}).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : cards.map((item) => (
                    <Card
                        key={item.title}
                        title={item.title}
                        span1={item.result}
                        span2={item.span2}
                    />
                ))
            }
        </div>
    );
}