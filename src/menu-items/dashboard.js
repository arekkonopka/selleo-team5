import {IconDashboard, IconCalendarTime, IconCalendar, IconEdit, IconSettings} from '@tabler/icons';
const icons = { IconDashboard, IconCalendarTime, IconCalendar, IconEdit, IconSettings };

const dashboard = {
    id: 'navigation',
    title: 'Worklog Tracker',
    type: 'group',
    children: [
        // {
        //     id: 'default',
        //     title: 'Dashboard',
        //     type: 'item',
        //     url: '/',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // },
        {
            id: 'worklog',
            title: 'Worklog',
            type: 'item',
            url: '/',
            icon: icons.IconCalendarTime,
            breadcrumbs: false
        },
        // {
        //     id: 'calendar',
        //     title: 'Calendar',
        //     type: 'item',
        //     url: '/calendar',
        //     icon: icons.IconCalendar,
        //     breadcrumbs: false
        // },
        {
            id: 'management',
            title: 'Management',
            type: 'item',
            url: '/management',
            icon: icons.IconEdit,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
