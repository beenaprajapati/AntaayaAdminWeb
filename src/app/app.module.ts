import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from '../modules/users/services/user.service'
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../modules/app-common/services/loader.service';
import { LoaderInterceptor } from '../modules/app-common/interceptors/loader-interceptor.service';
import { MyLoaderComponent } from '../modules/app-common/components/my-loader/my-loader.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
    declarations: [AppComponent,MyLoaderComponent],
    imports: [BrowserModule, AppRoutingModule,
         HttpClientModule,FormsModule,BrowserAnimationsModule,

        ToastrModule.forRoot(),MatTableModule,
        MatPaginatorModule,MatSortModule,MatMenuModule,MatIconModule,
        MatFormFieldModule,MatInputModule,
        NgbModule,
        MatCardModule,
        OwlDateTimeModule, OwlNativeDateTimeModule],
        
    providers: [ LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}

