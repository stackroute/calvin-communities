import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplateListService {

		constructor(private http: Http) { };

     
        getAllCommunities() {
    return this.http.get(`/api/v1/communities`).map(res => res.json());
  }
     

}