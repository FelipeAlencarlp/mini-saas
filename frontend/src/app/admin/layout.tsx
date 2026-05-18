import type { Metadata } from "next";
import NavAdmin from "@/components/admin/NavAdmin";
import LogoutButton from "@/components/dashboard/LogoutButton";

export const metadata: Metadata = {
    title: "Mini SaaS - Painel Admin",
};

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebad */}
            <aside className="flex flex-col w-64 bg-gray-800 p-0 min-h-screen">
                <h2 className="text-xl font-bold m-5 text-gray-200">
                    Painel de Controle
                    <hr className="my-2 border-t border-gray-500 w-full" />
                </h2>

                <NavAdmin />

                <div className="mt-auto">
                    <LogoutButton />
                </div>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 p-10 bg-gray-200">
                {children}
            </main>
        </div>
    );
}