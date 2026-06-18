"use client";

import { TitlePage } from "@/components/dashboard/titlePage/TitlePage";
import { DashboardCards } from "@/components/dashboard/card/DashboardCards";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/app/admin/helpers/dashboardData";
import { useToast } from "@/hooks/useToast";

export default function AdminPage() {
    const { showToast } = useToast();

    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    });

    if (error) {
        showToast('Erro ao carregar dados', 'error');
    }

    return (
        <>
            <TitlePage isLoading={isLoading}>
                Dashboard
            </TitlePage>

            <DashboardCards
                data={data}
                isLoading={isLoading}
            />
        </>
    );
}