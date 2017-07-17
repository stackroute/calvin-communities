import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TemplatesService {

		constructor(private http: Http) { };

		// selectTemplate(dummy)
		// {
        //    return this.http.get(`api/v1/communitytemplates/${dummy}`).map((response: Response) => response.json());
		// }


}