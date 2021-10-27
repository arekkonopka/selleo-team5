import React from 'react';
import useAuth from '../../hooks/useAuth';
import { ThemeRoutes } from '../../routes';
import { Navigate } from 'react-router';

export const AppWrapper: React.FC = (): JSX.Element => {
    const {isLoggedIn} = useAuth();

    console.log('islogged in', isLoggedIn);

    // if (!isLoggedIn) {
        return <Navigate to="/login" />
    // }

    return <ThemeRoutes/>
}
