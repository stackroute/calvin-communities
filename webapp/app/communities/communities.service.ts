import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommunitiesService {
	constructor(private http: Http) { };
	selectCommunities(){
		return this.http.get(`api/v1/communities`)
		.map(response => response.json());
	}
	selectTools(domain){
		return this.http.get('api/v1/communitytools/'+domain)
		.map(response => response.json());
	}
}
