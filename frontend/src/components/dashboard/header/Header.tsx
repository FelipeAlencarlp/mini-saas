import { HiBars3, HiUserCircle } from 'react-icons/hi2';
import { HeaderSkeleton } from './HeaderSkeleton';
import { HeaderProps } from '@/types/dashboard/dashboard';

export function Header({
    isLoading,
    onOpenMenu,
    onOpenProfile
}: HeaderProps) {
    if (isLoading) return <HeaderSkeleton/>;

    return (
        <header
            className="
                fixed top-0 left-0 w-full
                bg-gray-800 h-17 z-40
                flex items-center justify-between
                px-4 md:border-b
            "
        >
            {/* Menu */}
            <button
                onClick={onOpenMenu}
                className="text-white md:hidden"
            >
                <HiBars3 size={28} />
            </button>

            <p className="
                bg-linear-to-r from-gray-300 to-blue-600
                bg-clip-text text-transparent
                font-semibold text-2xl md:pl-12
            ">
                Mini SaaS
            </p>

            {/* Perfil */}
            <button
                onClick={onOpenProfile}
                title="Perfil"
                className="text-white cursor-pointer"
            >
                <HiUserCircle size={32} />
            </button>
        </header>
    );
}