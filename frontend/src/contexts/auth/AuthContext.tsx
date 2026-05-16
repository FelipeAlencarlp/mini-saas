"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = Cookies.get('auth');

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    function login(token: string) {
        Cookies.set('auth', token);
        setToken(token);
    }

    function logout() {
        Cookies.remove('auth');
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}