import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

const url = `http://localhost:3000`;

@Injectable()
export class ToolsGraphService {
  constructor(private http: Http) {};

 getDomainsAndTools() {
    return this.http.get(`${url}/api/v1/tools`).map(res => res.json());
  }


  }