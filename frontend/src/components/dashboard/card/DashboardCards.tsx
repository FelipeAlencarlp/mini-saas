import { DashboardCardsProps } from "@/types/dashboard/DashboardCardsProps.type";
import { Card } from "./Card";
import { CardSkeleton } from "./CardSkeleton";

export function DashboardCards({
    data,
    isLoading
}: DashboardCardsProps) {
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