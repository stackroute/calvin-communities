import {Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CommunityPageService
{
    constructor(private _http:Http){}
    getCommunityDetails(domain:string){
        return this._http.get('/api/v1/communities/'+domain).map(res=>res.json());
    }
    getMembers(domain:string){
        return this._http.get('/api/v1/communitymembership/'+domain+'/members').map(res=>res.json());
    }
   	getTools(domain:string){
        return this._http.get('/api/v1/communitytools/'+domain).map(res=>res.json());
    }
}