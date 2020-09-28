import {User} from '../models/user.model';
import { Observable } from  'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService {
        Api_URL = "http://feosys.com/angular";
        constructor(private httpClient:HttpClient)
        {

        }
        createUser(user: User): Observable<User>{
        if(user.Id==null)
        {
          return this.httpClient.post<User>(`${this.Api_URL}/api/usermaster/create.php`, user);
        }
        else
        {
          return this.httpClient.put<User>(`${this.Api_URL}/api/usermaster/update.php`, user);
        }
      }
      getUser(searchText:any, PageIndex:any, PageSize:any, sortHeader:any) {
        let params = new HttpParams();
        params = params.append('search', searchText);
        params = params.append('pageNo', PageIndex);
        params = params.append('pageSize', PageSize);
        params = params.append('orderBy', sortHeader);
        return this.httpClient.get(`${this.Api_URL}/api/usermaster/read.php`,{params:params});
      }
      getUserByID(Id:number)
      {
        return this.httpClient.get(`${this.Api_URL}/api/usermaster/read.php?UserId=`+Id);
      }
      deleteUser(Id:number)
      {
        return this.httpClient.delete(`${this.Api_URL}/api/usermaster/delete.php`+Id);
      }
}
