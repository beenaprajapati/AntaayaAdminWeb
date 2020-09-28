import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './containers/create-user/create-user.component';




/* Containers */
import * as userContainers from './containers';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ConfirmEqualValidatorDirective } from './directives';
import { UserListComponent } from './containers/user-list/user-list.component';


import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule

  ],

    providers: [],
    declarations: [...userContainers.containers,ConfirmEqualValidatorDirective, UserListComponent],
    exports: [...userContainers.containers],
})
export class UsersModule { }
