"use client";

import { useQuery } from '@tanstack/react-query';
import { HiXMark, HiUserCircle } from 'react-icons/hi2';
import { getUser } from "@/services/usersService";
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