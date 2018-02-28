import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../reusableComponents/app.settings';

@Injectable()
export class UserService {
  currentState = {};
  private emailURL = '/rest/admin/listByEmail' ;
  constructor(private http: Http) {
    
  }

  getUsers(): Observable<any> {
  	return this.http.get(AppSettings.API_ENDPOINT + '/rest/admin/list')
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
   getUserByEmail (username): Observable<any> {
	  let params = new URLSearchParams();
	   params.set('userEmail', username); 
	   
	   return this.http.get(AppSettings.API_ENDPOINT + this.emailURL,{ search: params })
                       .map(response => response.json())
	  				   .catch(this.handleError);
  }
  
  saveUser (data): Observable<any> {
      return this.http.post(AppSettings.API_ENDPOINT + '/rest/admin/register', data)
             .map(response => response.json())
	  	     .catch(this.handleError);
  }
  
  deleteUser (id): Observable<any> {
       return this.http.get(AppSettings.API_ENDPOINT+ '/rest/admin/delete/'+ id)
                .map(response => response.json())
	  	        .catch(this.handleError);
  }
  
  updateEmployee (username): Observable<any> {
	  let params = new URLSearchParams();
	   params.set('userEmail', username); 
	   
	   return this.http.get(AppSettings.API_ENDPOINT + '/rest/employeeLog/update',{ search: params })
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
      if (error instanceof Response) {
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