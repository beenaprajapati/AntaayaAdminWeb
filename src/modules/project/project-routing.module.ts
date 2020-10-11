/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
/* Containers */
import * as projectContainers from './containers';
import { ProjectModule } from './project.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: projectContainers.CreateProjectComponent,
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
        path: 'create-project',
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
       component: projectContainers.CreateProjectComponent,
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
       component: projectContainers.CreateProjectComponent,
    },
        {
            path: 'project-list',
        data: {
            title: 'Projectist',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Project List',
                    active: true,
                },
            ],
        } as SBRouteData,
        
        canActivate: [],
       component: projectContainers.ProjectListComponent,
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
    imports: [ProjectModule,RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}
