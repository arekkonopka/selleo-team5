import { lazy } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Loadable } from '../ui-component/Loadable';

// @ts-ignore
const DashboardDefault = Loadable(lazy(() => import('../views/pages/dashboard/Dashboard')));
// @ts-ignore
const TrackerPage = Loadable(lazy(() => import('../views/pages/worklog/Worklog')));
// @ts-ignore
const CalendarPage = Loadable(lazy(() => import('../views/pages/calendar/Calendar')));
// @ts-ignore
const ManagementPage = Loadable(lazy(() => import('../views/pages/management/Management')));
// @ts-ignore
const ManagementDetailsPage = Loadable(lazy(() => import('../views/pages/management/details/Details')));
// @ts-ignore
const SettingsPage = Loadable(lazy(() => import('../views/pages/settings/Settings')));

export const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <DashboardDefault/>
        },
        {
            path: '/worklog',
            element: <TrackerPage/>
        },
        {
            path: '/calendar',
            element: <CalendarPage/>
        },
        {
            path: '/management',
            element: <ManagementPage/>
        },
        {
            path: '/management/:id',
            element: <ManagementDetailsPage/>
        },
        {
            path: '/settings',
            element: <SettingsPage/>
        },
    ]
};
