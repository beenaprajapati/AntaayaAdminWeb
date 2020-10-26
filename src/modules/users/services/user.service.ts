import {User} from '../models/user.model';
import { Observable } from  'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable()
export class UserService {
        Api_URL = environment.baseUrl;
        constructor(private httpClient:HttpClient)
        {

        }
        createUser(user: User,USerId :number): Observable<User>{
        if(USerId==0)
        {
          return this.httpClient.post<User>(`${this.Api_URL}usermaster/create`, user);
        }
        else
        {
          return this.httpClient.put<User>(`${this.Api_URL}usermaster/update`, user);
        }
      }
      getUser(searchText:any, PageIndex:any, PageSize:any, sortHeader:any) {
        let params = new HttpParams();
        params = params.append('sort_by', '');
        params = params.append('offset', PageIndex);
        params = params.append('limit', PageSize);
        params = params.append('sort_type', sortHeader);
        params = params.append('keyword', searchText);
        //return this.httpClient.get(`${this.Api_URL}usermaster/read.php`);
        //return this.httpClient.get(`${this.Api_URL}usermaster?limit=`+100+`&offset=`+1+`&sort_by=FirstName&sort_type=asc`);
         //alert(this.httpClient.get(`${this.Api_URL}usermaster/14`,{responseType: 'json'}));

          //  this.http.post(
          // 'http://10.0.1.19/login',
          // {email, password},
          // {responseType: 'text'})
         //return this.httpClient.get(`https://antaayaarchitects.com/RESTAPI/usermaster?limit=100&offset=1&sort_by=&sort_type=&keyword=`);
        return this.httpClient.get(`${this.Api_URL}usermaster?limit=`+PageSize+`&offset=`+PageIndex+`&sort_by=&sort_type=`+sortHeader+`&keyword=`+searchText +``);
      }
      getUserByID(Id:number)
      {
        // alert(Id);
        return this.httpClient.get(`${this.Api_URL}usermaster/index_get/`+Id);
      }
      deleteUser(Id:number)
      {
        // alert(Id);
        return this.httpClient.delete(`${this.Api_URL}Usermaster/Delete/`+Id);
      }
}
