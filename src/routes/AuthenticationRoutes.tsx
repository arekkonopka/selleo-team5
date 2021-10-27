import { lazy } from 'react';
import { Loadable } from '../ui-component/Loadable';
import { MinimalLayout } from '../layout/MinimalLayout';

// @ts-ignore
const AuthLogin = Loadable(lazy(() => import('../views/authentication/Login')));

export const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: '/login',
            element: <AuthLogin/>
        },
    ]
};
