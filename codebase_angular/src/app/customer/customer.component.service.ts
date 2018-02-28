import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../reusableComponents/app.settings';
import { CommonService } from '../reusableComponents/common.service';


@Injectable()
export class CustomerService {
  currentState = {};
    
constructor(public http: Http, public commonService: CommonService) {
  }

 getCustomers(): Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + '/rest/employeeLog/allLogs')
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
  allCustomer(): Observable<any> {
       let params = new URLSearchParams();
      params.set('type', "selectDropDown");
      params.set('userEmail',  this.commonService.getUserEmail());
	   return this.http.get(AppSettings.API_ENDPOINT + '/rest/customer/list',  { search: params })
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
    
  saveCustomer (data): Observable<any> {
      return this.http.post(AppSettings.API_ENDPOINT+ '/rest/customer/save', data)     
            .map(response => response.json())
	  	    .catch(this.handleError);
  } 
  
  deleteCustomer (id): Observable<any> {
       return this.http.post(AppSettings.API_ENDPOINT+ '/rest/customer/delete/'+ id, "")
             .map(response => response.json())
	  	     .catch(this.handleError);
  }
  
  //Following code is added to fetch user data basedon selecteddropdown.
  fetchUserAllData(customerId): Observable<any> {
    let params = new URLSearchParams();
    params.set('customerIDs', customerId);
    params.set('userEmail',  this.commonService.getUserEmail());
	return this.http.get(AppSettings.API_ENDPOINT + '/rest/admin/fetchBySelectedCustomer', { search: params })
                       .map(response => response.json());

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
