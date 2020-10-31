import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Antaaya',
        items: ['dashboard', 'users', 'project','items','task']
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
    users:
    {
        icon: 'user',
        text: 'User',

        // submenu: [
        //     {
        //         text: 'Create User',
        //         link: '/users/create-user',
        //     },
        //     {
        //         text: 'User List',
        link: '/users/user-list',

    }
    ,
    project:
    {
        icon: 'user',
        text: 'Project',
        link: '/project/project-list',

    }
    ,
    items:
    {
        icon: 'user',
        text: 'ItemMaster',
        link: '/items/item-list',

    },
    task:
    {
        icon: 'user',
        text: 'Task',
        link: '/task/task-list',

    }
};
