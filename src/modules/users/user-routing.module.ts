/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
/* Containers */
import * as userContainers from './containers';
import { UsersModule } from './users.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: userContainers.CreateUserComponent,
        data: {
            title: 'Tables - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create User',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'create-user',
        data: {
            title: 'CreateUser',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create User',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: userContainers.CreateUserComponent,
    },
    {
        path: 'Edit/:Id',
        data: {
            title: 'UpdateUser',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Update User',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: userContainers.CreateUserComponent,
    },
        {
            path: 'user-list',
        data: {
            title: 'UserList',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'User List',
                    active: true,
                },
            ],
        } as SBRouteData,
        
        canActivate: [],
       component: userContainers.UserListComponent,
    },
    // {
    //     path: 'light',
    //     data: {
    //         title: 'Dashboard Light - SB Admin Angular',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Light',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //    // component: dashboardContainers.LightComponent,
    // },
];

@NgModule({
    imports: [UsersModule,RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
