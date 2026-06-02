import { HiXMark, HiUserCircle } from 'react-icons/hi2';
import { LogoutButton } from './LogoutButton';
import { UserType } from '@/types/User.type';

interface ProfileDrawerProps {
    open: boolean;
    user?: UserType;
    isLoading: boolean;
    onClose: () => void;
}

export function ProfileDrawer({
    open,
    user,
    isLoading,
    onClose
}: ProfileDrawerProps) {
    return (
        <div
            className={`
                absolute top-10 right-8.5 z-50
                w-64
                rounded-xl
                bg-gray-800
                shadow-2xl
                border border-gray-700
                transition-all duration-200

                ${open
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }
            `}
        >
            <div className="flex items-center justify-between p-5 border-b">
                <h2 className="font-bold text-lg text-gray-200">
                    Perfil
                </h2>

                <button
                    className="text-gray-200 cursor-pointer"
                    onClick={onClose}
                >
                    <HiXMark size={24} />
                </button>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-3">
                    <HiUserCircle size={50} />

                    <div>
                        {isLoading
                            ? (
                                <div className="animate-pulse">
                                    <p className="font-semibold"/>
                                    <p className="text-sm text-gray-500"/>
                                </div>
                              )
                            : (
                                <>
                                    <p className="font-semibold">
                                        {user?.username}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {user?.useremail}
                                    </p>
                                </>
                            )
                        }
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