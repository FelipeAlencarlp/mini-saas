"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    refreshToken: string | null;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = Cookies.get('auth');
        const storedRefreshToken = Cookies.get('refresh');

        storedToken ? setToken(storedToken) : null;
        storedRefreshToken ? setRefreshToken(storedRefreshToken) : null;
    }, []);

    function login(token: string, refreshToken: string) {
        Cookies.set('auth', token);
        Cookies.set('refresh', refreshToken);
        setToken(token);
        setRefreshToken(refreshToken);
    }

    function logout() {
        Cookies.remove('auth');
        Cookies.remove('refresh')
        setToken(null);
        setRefreshToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                refreshToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}