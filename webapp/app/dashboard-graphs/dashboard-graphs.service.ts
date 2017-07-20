import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardGraphService {

  constructor(private http: Http) {};


  getPurposes() {
    return this.http.get(`/api/v1/communitytemplates/allpurposes`).map(res => res.json());
  }

  getAllCommunities() {
    return this.http.get(`/api/v1/communities`).map(res => res.json());
  }
}
