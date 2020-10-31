import {Item} from '../models/item.model';
import { Observable } from  'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable()
export class ItemService {
        Api_URL = environment.baseUrl;
        constructor(private httpClient:HttpClient)
        {

        }
        createItem(item: Item,itemId :number): Observable<Item>{
        if(itemId==0)
        {
          return this.httpClient.post<Item>(`${this.Api_URL}usermaster/create`, item);
        }
        else
        {
          return this.httpClient.put<Item>(`${this.Api_URL}usermaster/update`, item);
        }
      }
      getItem(searchText:any, PageIndex:any, PageSize:any, sortHeader:any) {
        return this.httpClient.get(`${this.Api_URL}itemmaster?limit=`+PageSize+`&offset=`+PageIndex+`&sort_by=&sort_type=`+sortHeader+`&keyword=`+searchText +``);
      }
      getItemByID(Id:number)
      {
        // alert(Id);
        return this.httpClient.get(`${this.Api_URL}usermaster/index_get/`+Id);
      }
      deleteItem(Id:number)
      {
        return this.httpClient.delete(`${this.Api_URL}Usermaster/Delete/`+Id);
      }
}
