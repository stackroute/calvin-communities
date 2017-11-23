import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplatesService {

		constructor(private http: Http) { };

    selectTemplates()
		{
           return this.http.get(`api/v1/communitytemplates/`).map((response: Response) => response.json());
		}

     getAllTemplates(value){
    	console.log("hello");
    	  return this.http.get('/api/v1/communitytemplates?purpose='+value).map(res=>res.json());
    }

	    getAllCommunities() {
    return this.http.get(`/api/v1/communities`).map(res => res.json());
  }
}