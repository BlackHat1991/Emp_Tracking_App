import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { AppState } from '../app.service';
import { XLarge } from './x-large';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.component.service';
import { AppComponent } from '../app.component';
import { CommonService } from '../reusableComponents/common.service';
declare var $: any;

@Component({
  selector: 'home',  
  providers: [
    
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  userDetails = {
	  userName: "",
	  password: ""
  };
  loadingError = false;
  error;

  // TypeScript public modifiers
  constructor(public appState: AppState, public router: Router, public authenticationService: AuthenticationService,  public userService: UserService, public appComponent: AppComponent, public commonService: CommonService) {
    this.userDetails.userName = "user1@test.com";
    this.userDetails.password = "12345";
  }    
  
  login(userDetails) {
      this.loadingError = false;
	  let currentState = this;
        this.authenticationService.login(userDetails.userName, userDetails.password)
            .subscribe(result => {
                if (result === true) {
					this.commonService.setUserEmail(userDetails.userName);
					localStorage.setItem('userPassword',userDetails.password);
					//Determine user role
					this.userService.getUserByEmail(userDetails.userName).subscribe(function(data){
						 this.userList = data;
						
						localStorage.setItem('userRole', this.userList.role);
                        localStorage.setItem('userName',this.userList.email);                        
                        localStorage.setItem('userDetail', JSON.stringify(this.userList));
						//window.location.reload();
						if(localStorage.getItem('userRole') === 'ADMIN'){
							currentState.router.navigate(['/user']);
						}else{
							currentState.router.navigate(['/dashBoard']);
						} 						
					 });
                } else {
                    this.loadingError = true;
                }
            },
		   (err=> {
			this.loadingError = true;
		}));
    }

  ngOnInit() {
    localStorage.setItem('loginFlag', 'false');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDetail');
	localStorage.removeItem('currentUser');
	localStorage.removeItem('userPassword');
	localStorage.removeItem('userName');
	  
    this.router.navigate(['/']);
  }

  submitState(value: string) {
    this.appState.set('value', value);
  }
}
