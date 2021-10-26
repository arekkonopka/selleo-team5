import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../models/User';

export interface AuthContextType {
    user?: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    error?: any;
    login: (name: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children}: { children: ReactNode; }): JSX.Element {
    const session: string | null = localStorage.getItem('session');

    const [user, setUser] = useState<User | null>(session ? {name: session} : null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(!!session);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!session);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    function login(name: string) {
        setUser({name});
        setIsLoggedIn(true);
        setError(null);
        setLoading(false);
        navigate('/');
    }

    function logout(): void {
        localStorage.removeItem('session');

        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    }

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            isLoggedIn,
            login,
            logout,
        }),
        [user, loading, error, isLoggedIn]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}
