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



@NgModule({
  
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
  ],
    providers: [],
    declarations: [...userContainers.containers,ConfirmEqualValidatorDirective],
    exports: [...userContainers.containers],
})
export class UsersModule { }
