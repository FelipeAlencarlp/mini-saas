import { HiXMark } from 'react-icons/hi2';
import NavAdmin from './NavAdmin';
import { SidebarSkeleton } from './SidebarSkeleton';
import { SidebarProps } from '@/types/dashboard/SidebarProps.type';

export function Sidebar({
    open,
    isLoading,
    onClose
}: SidebarProps) {
    if (isLoading) {
        return <SidebarSkeleton/>
    }

    return (
        <aside
            className={`
                fixed top-0 left-0 z-50
                w-64 h-screen bg-gray-800
                transform transition-transform duration-300

                ${open ? 'translate-x-0' : '-translate-x-full'}

                md:translate-x-0 md:static md:flex
                flex flex-col
            `}
        >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-gray-200">
                    Painel de Controle
                </h2>

                {/* Botão fechar mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden text-gray-200"
                >
                    <HiXMark size={24} />
                </button>
            </div>

            {/* Navegação */}
            <div className="mt-5">
                <NavAdmin />
            </div>
        </aside>
    );
}