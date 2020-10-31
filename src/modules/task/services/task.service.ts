import {Task} from '../models/task.model';
import { Observable } from  'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable()
export class TaskService {
        Api_URL = environment.baseUrl;
        constructor(private httpClient:HttpClient)
        {

        }
        createTask(task: Task,Id :number): Observable<Task>{
        if(Id == 0)
        {
          return this.httpClient.post<Task>(`${this.Api_URL}Createtask/Insert`, task);
        }
        else
        {
          return this.httpClient.put<Task>(`${this.Api_URL}Createtask/Update`, task);
        }
      }
      getTask(searchText:any, PageIndex:any, PageSize:any, sortHeader:any) {
        
        return this.httpClient.get(`${this.Api_URL}Createtask?limit=`+PageSize+`&offset=`+PageIndex+`&sort_by=&sort_type=`+sortHeader+`&keyword=`+searchText +``);
        
      }
      getTaskByID(Id:number)
      {
        return this.httpClient.get(`${this.Api_URL}Createtask/index_get/`+Id);
      }
      deleteTask(Id:number)
      { 
        return this.httpClient.delete(`${this.Api_URL}Createtask/index_delete/`+Id);
      }
}
