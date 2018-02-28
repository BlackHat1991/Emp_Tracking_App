import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../reusableComponents/app.settings';
import { CommonService } from '../reusableComponents/common.service';


@Injectable()
export class EmployeeService {
  currentState = {};
    
constructor(public http: Http, public commonService: CommonService) {
  }

 getEmployees(): Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + '/rest/employeeLog/allLogs')
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
  
  
  private extractData(res: Response) {
      let body = res;
      return body || { };
  }
  
  private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error) {
        const body = error || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Promise.reject(errMsg);
  }    
}
