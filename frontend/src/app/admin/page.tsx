"use client";

import { TitlePage } from "@/components/dashboard/TitlePage";
import DashboardCards from "@/components/dashboard/card/DashboardCards";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./helpers/dashboardData";

export default function AdminPage() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    });

    if (error) console.log(error);

    return (
        <div>
            <TitlePage isLoading={isLoading}>
                Dashboard
            </TitlePage>
            
            <DashboardCards
                data={data}
                isLoading={isLoading}
            />
        </div>
    );
}