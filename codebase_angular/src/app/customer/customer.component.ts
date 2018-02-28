import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { XLarge } from './x-large';
import { CustomerService } from './customer.component.service';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { UserService } from '../user/user.component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'customer',  
  templateUrl: './customer.component.html'
})

export class CustomerComponent {
  customerFormFlag = true; 
  customerList = [];
  customerDetails = {};
  filterDetails = {};
  allCustomerList;
  allUserList;
  index;
  userData;
  selectedUserList;
  selectedUserListOption;
  optionsModel: number[];
  optionsModel1: number[];
  validationFlag = true;
  emptyRecords = false;
  errorMessage;
  error;
  saveError = false;
  busy: Subscription;
  mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default form-control',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select..',
  };

  constructor(public appState: AppState, public customerService: CustomerService, public userService: UserService) {
    //console.log('hello `Customer` component1');
  }
  
  private selectedOptions: number[];

  private myOptions;

  private myOptions2;

 /*
  * this method is called for listing the customer  
  */ 
 getCustomers(){
        let currentState = this;
        this.busy = this.customerService.getCustomers().subscribe(function(data){
            currentState.customerList = data;
            currentState.allCustomerList = currentState.customerList;
            if (data.length === 0){
                 currentState.emptyRecords = true;
             } else {
                currentState.emptyRecords = false;
            }
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

  /*
  * On click of save this method is called    
  */
  saveCustomer(customer){
          let currentState = this;
          currentState.selectedUserList = [];
          currentState.selectedUserListOption = [];
          if (this.formValidation(customer, currentState.optionsModel, currentState.optionsModel1)){
                if (currentState.optionsModel) {	
                    for (let entry of currentState.optionsModel ) {	
                            this.userData = this.myOptions.filter(userList => userList.id === entry); 
                            currentState.selectedUserListOption.push(this.userData[0]);
                    }	
                }
                if (currentState.optionsModel1) {	
                    for (let entry of currentState.optionsModel1 ) {	
                        this.userData = this.myOptions2.filter(userList => userList.id === entry); 
                        currentState.selectedUserListOption.push(this.userData[0]);
                    }	
                }
                for (let entry of currentState.selectedUserListOption ) {			
                        this.userData = this.allUserList.filter(userList => userList.id === entry.parentId); 
                        currentState.selectedUserList.push(this.userData[0]);
                }

                customer.users = currentState.selectedUserList;
                this.customerService.saveCustomer(customer).subscribe(function(data){
                        currentState.customerFormFlag = true;
                        currentState.customerDetails = {};
                        currentState.getCustomers();
                        window.scroll(0, 0);
                },
               (err => {
                        this.saveError = true;
                        this.error = err;
                        if (this.error === undefined){
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

  formValidation(data, optionsModel, optionsModel1) {
	this.errorMessage = '';
			this.validationFlag = true;
			if (data) {
				if (optionsModel.length === 0) {
					this.errorMessage += 'Please Select Customer Role <br/>';
					this.validationFlag = false;
				}
                if (optionsModel1.length === 0) {
					this.errorMessage += 'Please Select CSR Role <br/>';
					this.validationFlag = false;
				}
			return this.validationFlag;
		};
	}
  
  /*
  * On click of Delete this method is called    
  */
  deleteCustomer(customerID){
      document.getElementById("deleteCustomer").style.display = "none";
        let currentState = this;
        this.customerService.deleteCustomer(customerID).subscribe(function(data){
            currentState.customerDetails = {};
            currentState.getCustomers();
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

  ngOnInit() {
      this.getCustomers();
      this.getUsers();
  }
  
  /*
    * This method is called for Add/Edit customer
    */
  showCustomerForm(type, data){
            window.scroll(0, 0);
          let currentState = this;
          currentState.myOptions = [];
          currentState.myOptions2 = [];
          currentState.optionsModel = [];
          currentState.optionsModel1 = [];
          currentState.index = 0;
          for (let entry of currentState.allUserList ) {
              if (entry.role === "CUSTOMER") {
                  currentState.myOptions.push({id: currentState.index+1, name: entry.firstName+ " " + entry.lastName,
                                         parentId: entry.id});
              }
              if (entry.role === "CSR") {
                  currentState.myOptions2.push({id: currentState.index+1, name: entry.firstName + " " + entry.lastName,
                                        parentId: entry.id});
              }
              currentState.index ++;
	       }
	  
            if (type === 'add') {
                 this.customerFormFlag = false; 
                currentState.customerDetails = {};
            } else {
              if (data.users.length > 0) {
                  for (let entry of data.users ) {
                      if (entry.role === "CUSTOMER") {
                            currentState.userData = this.myOptions.filter(userList => userList.parentId === entry.id);
                            if(currentState.userData.length > 0) {
                                currentState.optionsModel.push(currentState.userData[0].id);
                            }
                      }
                      if (entry.role === "CSR") {
                            currentState.userData = this.myOptions2.filter(userList => userList.parentId === entry.id);
                            if(currentState.userData.length > 0){
                                currentState.optionsModel1.push(currentState.userData[0].id);
                            }
                      }
                   }
                }
                currentState.customerDetails = data;
                this.customerFormFlag = false; 
            }     
  }

/*
* Method is called onchange of dropdown values and filter the customer list
*/
 onChange(newValue, type) {
      if (newValue != "") {
          this.customerList = this.allCustomerList.filter(
          customerList => customerList.name === newValue); 
      } else {
          this.customerList = this.allCustomerList;
      }
       
    this.customerList;
  }
  
  /*
  * this method is called for listing the user  
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
   
    /*
    * This method is called onclick "Back" button
    */
  cancel() {
      window.scroll(0, 0);
      this.customerFormFlag = true;
      this.getCustomers();
  }

    deleteConfirmation(customer) {
       this.customerDetails =  customer;
        document.getElementById("deleteCustomer").style.display = "block";
    }

    cancelDelete() {
       this.customerDetails =  {};
        document.getElementById("deleteCustomer").style.display = "none";
    }
}