/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
/* Containers */
import * as itemContainers from './containers';
import { ItemsModule } from './items.module';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: itemContainers.CreateItemComponent,
        data: {
            title: 'Tables - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create Item',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'create-item',
        data: {
            title: 'CreateItem',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Create Item',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: itemContainers.CreateItemComponent,
    },
    {
        path: 'Edit/:Id',
        data: {
            title: 'UpdateItem',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Update Item',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
       component: itemContainers.CreateItemComponent,
    },
        {
            path: 'item-list',
        data: {
            title: 'ItemList',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Item List',
                    active: true,
                },
            ],
        } as SBRouteData,
        
        canActivate: [],
       component: itemContainers.ItemListComponent,
        }
];

@NgModule({
    imports: [ItemsModule,RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ItmeRoutingModule {}
