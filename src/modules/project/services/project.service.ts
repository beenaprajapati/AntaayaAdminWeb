import {Project} from '../models/project.model';
import { Observable } from  'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable()
export class ProjectService {
        Api_URL = environment.baseUrl;
        constructor(private httpClient:HttpClient)
        {

        }
        createProject(project: Project,Id :number): Observable<Project>{
        if(Id == 0)
        {
          return this.httpClient.post<Project>(`${this.Api_URL}createproject/Insert`, project);
        }
        else
        {
          return this.httpClient.put<Project>(`${this.Api_URL}createproject/Update`, project);
        }
      }
      getProject(searchText:any, PageIndex:any, PageSize:any, sortHeader:any) {
        
        return this.httpClient.get(`${this.Api_URL}createproject?limit=`+PageSize+`&offset=`+PageIndex+`&sort_by=&sort_type=`+sortHeader+`&keyword=`+searchText +``);
        
      }
      getProjectByID(Id:number)
      {
        return this.httpClient.get(`${this.Api_URL}createproject/index_get/`+Id);
      }
      deleteProject(Id:number)
      { 
        return this.httpClient.delete(`${this.Api_URL}createproject/index_delete/`+Id);
      }
}
