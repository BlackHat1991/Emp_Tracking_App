import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { XLarge } from './x-large';
import { UserService } from './user.component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user',  
  templateUrl: './user.component.html'
})
export class UserComponent {
  userFormFlag = true;
  userDetails;    
  filterDetails = {};    
  userList = [];
  allUserList;
  role;
  validationFlag = true;
  errorMessage;
  saveError = false;
  emptyRecords = false;
  error;
  busy: Subscription;
  constructor(public appState: AppState, public userService: UserService) {
	  this.userDetails = {};
	  this.role = [{
            role : "Select Role"
        }, {
            role : "ADMIN"
        }, {
            role : "EMPLOYEE"
        }];
	    
  }
  submitted = false;
  ngOnInit() {
    window.scroll(0, 0);
    this.getUsers();
  }

  /*
  * this method is called for listing the user  
  */ 
  getUsers(){
        let currentState = this;
        this.busy = this.userService.getUsers().subscribe(function(data){
             currentState.userList = data;
             currentState.allUserList = currentState.userList;
             if (data.length === 0){
                 currentState.emptyRecords = true;
             } else {
                currentState.emptyRecords = false;
            }
         },(err=> {
                    this.saveError = true;
                    this.error = err;
                    if(this.error === undefined){
                        this.error = 'Backend Error Please Contact the Adminstrator';
                    }
                    setTimeout(() => {              
                        this.saveError = false;
                    }, 3000);
                }));
    }
    
   /*
  * This method is called onclick Add/Edit User
  */
  showUserForm(type, data){
        window.scroll(0, 0);
      let currentState = this;
      if (type === 'add') {
            this.userFormFlag = false; 
            currentState.userDetails = {};
            currentState.userDetails.role = currentState.role[0].role;
      } else {
           currentState.userDetails = data;
            this.userFormFlag = false; 
      }  
  }
  
  /*
  * This method is called onclick "Back" button
  */
  cancel(){
    this.userFormFlag = true;
    window.scroll(0, 0);
    this.getUsers();
  }
  
 /*
  * this method is called for Saving the user deatil.
  */
  saveUser(user){
        let currentState = this;
        if (this.formValidation(user)){
                this.userService.saveUser(user).subscribe(function(data){
                     currentState.userFormFlag = true;
                     currentState.userDetails = {};
                     currentState.getUsers();
                     window.scroll(0, 0);
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
              this.validationFlag = false;
              setTimeout(() => {              
                  this.validationFlag = true;
                }, 3000);
          }
  }

/*
  * On click of Delete this method is called    
  */
  deleteUser(userID){
        document.getElementById("deleteUser").style.display = "none";
        let currentState = this;
        this.userService.deleteUser(userID).subscribe(function(data){
                currentState.userDetails = {};
                currentState.getUsers();
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
    }

/*
* Method is called onchange of dropdown values and filter the User list
*/
 onChange(newValue, type) {
      if (newValue != "") {
          this.userList = this.allUserList.filter(
          userList => userList.firstName === newValue); 
      } else {
          this.userList = this.allUserList;
      }
       
    this.userList;
  }

formValidation(data) {
	this.errorMessage = '';
			this.validationFlag = true;
			if (data) {

				if (!data.lastName) {
					this.errorMessage += 'Please Enter the Last Name <br/>';
					this.validationFlag = false;
				}
				if (!data.email) {
					this.errorMessage += 'Please Enter the Email <br/>';
					this.validationFlag = false;
				}
				if (!data.password) {
					this.errorMessage += 'Please Enter the Password <br/>';
					this.validationFlag = false;
				}
				if (data.role === "Select Role") {
					this.errorMessage += 'Please Select the Role';
					this.validationFlag = false;
				}

			return this.validationFlag;
		};
	}

    // following method used to show popup
    deleteConfirmation(user) {
       this.userDetails =  user;
        document.getElementById('deleteUser').style.display = 'block';
    }

    // following method used to close delete confirmation popup
    cancelDelete() {
        this.userDetails =  {};
        document.getElementById('deleteUser').style.display = 'none';
    }
}