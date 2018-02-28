import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { EmployeeService } from './employee.component.service';
import { UserService } from '../user/user.component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee',  
  templateUrl: './employee.component.html'
})

export class EmployeeComponent {
  
  allUserList;
  index;
  userData;
  validationFlag = true;
  emptyRecords = false;
  errorMessage;
  error;
  saveError = false;
  busy: Subscription;

  constructor(public appState: AppState, public employeeService: EmployeeService, public userService: UserService) {
   
  }

 //Following Init method loads all employee
  ngOnInit() {      
      this.getUsers();
  }
  
  /*
  * this method is called for listing the user/employee  
  */ 
  getUsers(){
         let currentState = this;
         this.userService.getUsers().subscribe(function(data){
             currentState.allUserList = data;		 
         },
            (err => {
                this.saveError = true;
                this.error = err.split('message\\":\\"')[1].split('\\"}"')[0];
                if (this.error === undefined){
                        this.error = 'Backend Error Please Contact the Adminstrator';
               }
             setTimeout(() => {              
                    this.saveError = false;
             }, 3000);
         }));
  }
}