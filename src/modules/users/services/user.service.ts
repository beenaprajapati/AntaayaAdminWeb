import {User} from '../models/user.model';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService {
  Api_URL = "http://feosys.com/angular";
    constructor(private httpClient:HttpClient)
    {

    }
    createUser(user: User): Observable<User>{
        return this.httpClient.post<User>(`${this.Api_URL}/api/usermaster/create.php`, user);
      }
      getUser(){
        return this.httpClient.get('https://api.github.com/events');
      }
      
}
