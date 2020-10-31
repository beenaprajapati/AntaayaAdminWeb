/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
/* Containers */
import * as taskContainers from './containers';
import { TaskModule } from './task.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: taskContainers.CreateTaskComponent,
        data: {
            title: 'Tables - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create Task',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'create-task',
        data: {
            title: 'CreateTask',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create Task',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: taskContainers.CreateTaskComponent,
    },
    {
        path: 'Edit/:Id',
        data: {
            title: 'UpdateTask',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Update Task',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: taskContainers.CreateTaskComponent,
    },
        {
            path: 'task-list',
        data: {
            title: 'Taskist',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Task List',
                    active: true,
                },
            ],
        } as SBRouteData,
        
        canActivate: [],
       component: taskContainers.TaskListComponent,
    },
    
];

@NgModule({
    imports: [TaskModule,RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TaskRoutingModule {}
