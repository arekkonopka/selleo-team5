import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { User } from '../models/User';

export interface AuthContextType {
    user?: User;
    isLoggedIn: boolean;
    loading: boolean;
    error?: any;
    login: (name: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProvider({children}: { children: ReactNode; }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    function login(name: string) {
        setLoading(true);

        localStorage.setItem('session', name);
        setUser({name: name});
        setIsLoggedIn(true);
        history.push('/');
    }

    // Call the logout endpoint and then remove the user
    // from the state.
    function logout(): void {
        localStorage.removeItem('session');
        setIsLoggedIn(false);
        setUser(undefined);
        history.push('/auth/login');
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

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}
