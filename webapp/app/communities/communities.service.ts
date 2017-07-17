import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CommunitiesService {
	constructor(private http: Http) { };
	selectCommunities(){
		console.log('hi');
		return this.http.get(`api/v1/communities`)
		.map(response => response.json());
	}
	/*selectTools(){
		console.log('hi');
		return this.http.get(`api/v1/tools`)
		.map(response => response.json());
	}*/
}