'use client';

import { ToastType } from '@/types/toast';
import { ToastContextType } from '@/types/toast';
import { ToastData } from '@/types/toast';
import {
    createContext,
    useState,
    ReactNode
} from 'react';

export const ToastContext = createContext({} as ToastContextType);

export function ToastProvider({
    children
}: {
    children: ReactNode;
}) {
    const [toast, setToast] = useState<ToastData | null>(null);

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div className="fixed top-5 right-5 z-50">
                    <div
                        className={`
                            px-4 py-3 rounded text-white shadow
                            ${toast.type === 'success' && 'bg-green-500'}
                            ${toast.type === 'error' && 'bg-red-500'}
                            ${toast.type === 'warning' && 'bg-yellow-500'}
                        `}
                    >
                        {toast.message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}