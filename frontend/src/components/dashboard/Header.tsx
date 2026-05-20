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
                className="text-white"
            >
                <HiBars3 size={28} />
            </button>

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