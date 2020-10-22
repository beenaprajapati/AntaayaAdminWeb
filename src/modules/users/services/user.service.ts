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
        createUser(user: User,id :number): Observable<User>{
        if(id==0)
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
        return this.httpClient.get(`${this.Api_URL}usermaster/read.php`);
      }
      getUserByID(Id:number)
      {
        return this.httpClient.get(`${this.Api_URL}usermaster/read.php?USerId=`+Id);
      }
      deleteUser(Id:number)
      {
        return this.httpClient.delete(`${this.Api_URL}usermaster/delete.php`+Id);
      }
}
