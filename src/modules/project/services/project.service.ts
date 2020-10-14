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
        let params = new HttpParams();
        params = params.append('sort_by', searchText);
        params = params.append('offset', PageIndex);
        params = params.append('limit', PageSize);
        params = params.append('sort_type', sortHeader);
        return this.httpClient.get(`${this.Api_URL}createproject/`,{params:params});
      }
      getProjectByID(Id:number)
      {
        return this.httpClient.get(`${this.Api_URL}createproject/`+Id);
      }
      deleteProject(Id:number)
      {
        return this.httpClient.delete(`${this.Api_URL}createproject/`+Id);
      }
}
