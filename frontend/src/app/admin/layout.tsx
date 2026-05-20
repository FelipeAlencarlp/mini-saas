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
        <div className="flex min-h-screen bg-gray-200">
            <DashboardLayout />

            {/* Conteúdo */}
            <main className="flex-1 p-5 md:p-10">
                {children}
            </main>
        </div>
    );
}