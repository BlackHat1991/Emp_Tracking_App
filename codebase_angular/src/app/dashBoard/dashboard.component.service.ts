import { Injectable } from '@angular/core';
import {Http, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../reusableComponents/app.settings';
import { CommonService } from '../reusableComponents/common.service';

@Injectable()
export class DashboardService {

constructor(public http: Http, public commonService: CommonService) {
}

   getAllEmployee (username): Observable<any> {
	  let params = new URLSearchParams();
	   params.set('userEmail', username); 
	   
	   return this.http.get(AppSettings.API_ENDPOINT + '/rest/employeeLog/allEmpLogs',{ search: params })
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }

    private extractData(res) {
        let body = res.json();
        return body || { };
    }

    private handleError (error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
