import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CommonService } from '../reusableComponents/common.service';
import { UserService } from '../user/user.component.service';
import {AppSettings} from '../reusableComponents/app.settings';
 
@Injectable()
export class AuthenticationService {
    public token: string;
	userDetails = {};
    userList;
 
    constructor(private http: Http, public commonService: CommonService, public userService: UserService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ headers: headers });
		let currentState = this;
        return this.http.post(AppSettings.API_ENDPOINT +'/j_spring_security_check', 'username='+ username +'&password='+password, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                
                if (response.status === 200) {
                    // set token property
					if(this.token != undefined) {
						this.token = this.commonService.getRandomString();
                     }                   	
					
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token:  this.token}));					
 					localStorage.setItem('loginFlag', 'true');
					
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}