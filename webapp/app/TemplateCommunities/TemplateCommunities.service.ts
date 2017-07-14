import {Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HTTPTestService
{
    page=1;
    constructor(private _http:Http){}
    getcurrentData(value:string){
        return this._http.get('http://localhost:3000/api/v1/communitytemplates/').map(res=>res.json());
    }
}