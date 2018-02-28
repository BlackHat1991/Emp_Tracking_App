import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AppSettings } from '../reusableComponents/app.settings';
import { Router} from '@angular/router';
import {Http, URLSearchParams, Response } from '@angular/http';

@Injectable()
export class CommonService {
    public static USER_EMAIL: string ;
    selectedDeviceRecord: Object;
    deviceDetailsId;
    private subject: Subject<boolean> = new Subject<boolean>();

constructor(public router: Router, private http: Http) {
    }  
    
setUserEmail(email){
    CommonService.USER_EMAIL = email;
  }
  
  getUserEmail() {
    if (CommonService.USER_EMAIL === undefined || CommonService.USER_EMAIL === null) {
        CommonService.USER_EMAIL = localStorage.getItem('userName');
        if(CommonService.USER_EMAIL === undefined || CommonService.USER_EMAIL === null){
            this.router.navigate(['/']);
        }
    }
    return CommonService.USER_EMAIL;
  }  

    private extractData(res: Response) {
	  let body = res.json();
	  return body || { };
    }

  getRandomString() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i = 0; i < 24; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
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

