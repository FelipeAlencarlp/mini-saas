import { Metadata } from 'next';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export const metadata: Metadata = {
    title: "Mini SaaS - Painel Admin",
};

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-200">
            <DashboardLayout />

            {/* Conteúdo */}
            <div className="flex">
                {/* Espaço da sidebar desktop */}
                <div className="hidden md:block w-64 shrink-0" />

                <main className="flex-1 p-5 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}