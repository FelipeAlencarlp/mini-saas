import { HiBars3, HiUserCircle } from 'react-icons/hi2';

interface HeaderProps {
    onOpenMenu: () => void;
    onOpenProfile: () => void;
}

export function Header({
    onOpenMenu,
    onOpenProfile
}: HeaderProps) {
    return (
        <header
            className="
                fixed top-0 left-0 w-full
                bg-gray-800 h-17 z-40
                flex items-center justify-between
                px-4
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
                bg-linear-to-r from-gray-400 to-blue-600
                bg-clip-text text-transparent
                font-semibold text-2xl md:pl-12
            ">
                Mini SaaS
            </p>

            {/* Perfil */}
            <button
                onClick={onOpenProfile}
                className="text-white"
            >
                <HiUserCircle size={32} />
            </button>
        </header>
    );
}