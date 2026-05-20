import { HiXMark, HiUserCircle } from 'react-icons/hi2';
import { LogoutButton } from './LogoutButton';

interface ProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function ProfileDrawer({
    open,
    onClose
}: ProfileDrawerProps) {
    return (
        <div
            className={`
                fixed top-0 right-0 z-50
                w-64 h-screen bg-gray-800
                shadow-lg
                transform transition-transform duration-300

                ${open ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            <div className="flex items-center justify-between p-5 border-b">
                <h2 className="font-bold text-lg text-gray-200">
                    Perfil
                </h2>

                <button
                    className="text-gray-200"
                    onClick={onClose}
                >
                    <HiXMark size={24} />
                </button>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-3">
                    <HiUserCircle size={50} />

                    <div>
                        <p className="font-semibold">
                            Nome Usuário
                        </p>

                        <p className="text-sm text-gray-500">
                            administrador
                        </p>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className="mt-auto">
                <LogoutButton />
            </div>
        </div>
    );
}