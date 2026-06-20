"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { TitlePage } from "@/components/dashboard/titlePage/TitlePage";
import { DashboardCards } from "@/components/dashboard/card/DashboardCards";
import { getDashboardData } from "@/app/admin/helpers/dashboardData";

export default function AdminPage() {
    const { showToast } = useToast();

    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    });

    useEffect(() => {
        if (error) {
            showToast('Erro ao carregar dados', 'error');
        }
    }, [error]);

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