import { HiXMark } from 'react-icons/hi2';
import NavAdmin from '../NavAdmin';
import { SidebarSkeleton } from './SidebarSkeleton';
import { SidebarProps } from '@/types/dashboard/dashboard';

export function Sidebar({
    open,
    isLoading,
    onClose
}: SidebarProps) {
    return (
        <>
            {isLoading
                ? (<SidebarSkeleton/>)
                : (
                    <aside
                        className={`
                            fixed left-0 top-17 z-50
                            w-64
                            h-[calc(100vh-68px)]
                            bg-gray-800

                            transform transition-transform duration-300

                            ${open ? 'translate-x-0' : '-translate-x-full'}

                            md:translate-x-0
                            flex flex-col
                        `}
                    >
                        {/* Header Sidebar */}
                        <div className="
                            md:hidden flex items-center
                            justify-between p-5 border-b
                        ">
                            <h2 className="text-lg font-bold text-gray-200">
                                Painel de Controle
                            </h2>

                            {/* Botão fechar mobile */}
                            <button
                                className="text-gray-200 cursor-pointer"
                                onClick={onClose}
                            >
                                <HiXMark size={24} />
                            </button>
                        </div>

                        {/* Navegação */}
                        <div className="mt-5">
                            <NavAdmin />
                        </div>
                    </aside>
                )
            }
        </>
    );
}