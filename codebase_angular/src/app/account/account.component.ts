import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.component.service';

@Component({
  selector: 'account',
  styles: [`
  `],
  templateUrl: './account.component.html'
})

export class AccountComponent {
  localState: any;
  userDetails = {};
  validationFlag = false;
  errorMessage;
  saveError = false;
  emptyRecords = false;
  saveSucess = false;  
  error;
  successMessage;

  constructor(public route: ActivatedRoute, public userService: UserService) {
      
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        this.localState = data.yourData;
      });
     this.userDetails = JSON.parse(localStorage.getItem('userDetail')); 
  }

/*
  * this method is called for Saving the user deatil.
  */
  saveUser(user){
    let currentState = this;
      if (!this.formValidation(user)){
             this.userService.saveUser(user).subscribe(function(data){
            
             localStorage.setItem('userDetail', JSON.stringify(data));
              this.userDetails = data;
              this.successMessage = 'Saved successfully.<br/>';   
              this.saveSucess = true;  
              setTimeout(() => {              
                    this.saveSucess = false;
                }, 3000);
        },
        (err=> {
                this.saveError = true;
                this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
                if(this.error === undefined){
                    this.error = 'Backend Error Please Contact the Adminstrator';
                }
                setTimeout(() => {              
                    this.saveError = false;
                }, 3000);
            })); 
      }else{
          this.validationFlag = true;
          setTimeout(() => {              
              this.validationFlag = false;
            }, 3000);
      }
  }
formValidation(data) {
	this.errorMessage = '';
			this.validationFlag = false;
			if (data) {
                
                if (!data.firstName) {
					this.errorMessage += 'Please select the first name value <br/>';
					this.validationFlag = true;
				}
				if (!data.lastName) {
					this.errorMessage += 'Please select the last name value <br/>';
					this.validationFlag = true;
				}
				if (!data.email) {
					this.errorMessage += 'Please select the email value <br/>';
					this.validationFlag = true;
				}
				if (!data.password) {
					this.errorMessage += 'Please select the password value <br/>';
					this.validationFlag = true;
				}
			return this.validationFlag;
		};
	}
  
  openNav() {
     document.getElementById("mySidenav").style.width = "250px";
  }

}
