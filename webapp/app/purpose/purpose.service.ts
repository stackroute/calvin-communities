import {Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class GetPurposeService
{
    constructor(private _http:Http){}
    getAllPurpose(){
        return this._http.get('/api/v1/communitytemplates/allpurposes').map(res=>res.json());
    }
    getAllTemplates(value){
    	console.log("hello");
    	  return this._http.get('/api/v1/communitytemplates?purpose='+value).map(res=>res.json());
    }
}