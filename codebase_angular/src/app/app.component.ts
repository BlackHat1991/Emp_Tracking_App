/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, Optional, ViewChild, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppState } from './app.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { EmployeeService } from './employee/employee.component.service';
import { AppConstantService } from './applicationConstants/applicationConstant.component.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { NgbTabChangeEvent, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashBoard/dashboard.component.service';
import { NgForm, FormGroup, FormControl  } from '@angular/forms';
import { UserService } from './user/user.component.service';
declare var $: any;

/*
 * App Component style="height: 77px;background-color: rgba(103, 133, 220, 0.89)"
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
 <nav class = "navbar" role = "navigation" [ngClass]="{'nav-Background-login': loginMenu, 'nav-Background-menu': getLoginFlag()}">
   
   <div class = "navbar-header" style="width: -webkit-fill-available;">

	 <button type = "button" class = "navbar-toggle pull-left" style="left: 5px;top:10px;background-color: #1e2fa3;" (click)="showLeftButton = !showLeftButton;toggleNav('left')" [hidden]="!getLoginFlag()" data-toggle = "collapse" data-target = "#example-navbar-collapse">
         <span class = "sr-only">Toggle navigation</span>
         <span class = "icon-bar" style="background: white;"></span>
         <span class = "icon-bar" style="background: white;"></span>
         <span class = "icon-bar" style="background: white;"></span>
      </button>
        
    
        <button type = "button" class = "navbar-toggle pull-right" style="left: 5px;top:10px;background-color: #1e2fa3;" (click)="showRightButton = !showRightButton;toggleNav('right')" [hidden]="!getLoginFlag()" data-toggle = "collapse" data-target = "#example-navbar-right-collapse">
         <span class = "sr-only">Toggle navigation</span>
         <span class = "icon-bar" style="background: white;"></span>
         <span class = "icon-bar" style="background: white;"></span>
         <span class = "icon-bar" style="background: white;"></span>
      </button>
      
   </div>
    
    <div class = "right-nav" id = "example-navbar-right-collapse" *ngIf="showRightButton">
        <md-nav-list>
            <a md-list-item (click)="account();showRightButton = !showRightButton" *ngIf="getLoginFlag()">Account</a>
            
            <a md-list-item (click)="logout();showRightButton = !showRightButton" *ngIf="getLoginFlag()">Sign Out</a>
            
        </md-nav-list>
        
    </div>

    <div class = "collapse navbar-collapse">        
        
        <div style="text-align: center;color: white;font-size: xx-large;padding-bottom: 10px;" *ngIf="getLoginName() === undefined || getLoginName() === null">Employee Tracking App</div>
        <div class="col-xs-12 col-sm-5 col-md-5">
           <a id="userLinkHeader" [routerLink]="['./user']" class="top-menu-button btn" *ngIf="getLoginName() === 'ADMIN'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">Employee Registration</a>

            <a id="customerLinkHeader" [routerLink]="['./employee']" class="top-menu-button btn" *ngIf="getLoginName() === 'ADMIN'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">Employee Details</a>

            <a [routerLink]="['./dashBoard']" class="top-menu-button btn" id="dashBoardId" *ngIf="getLoginName() === 'CSR' || getLoginName() === 'EMPLOYEE'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">Dash board</a> 
        </div>
           
        <div class="col-xs-12 col-sm-2 col-md-2 pull-right" [hidden]="!getLoginFlag()"> 
            <label style="padding-top:10px;color: white;"> {{userDetail.firstName}} {{userDetail.lastName}} </label>
            <button md-icon-button [md-menu-trigger-for]="menu" class="pull-right" style="color: white;">
                <md-icon>more_vert</md-icon>
            </button>
        </div>
         
        <md-menu x-position="before"  #menu="mdMenu" >
            <button md-menu-item (click)="account();" *ngIf="getLoginFlag()">Account </button>

            <button md-menu-item (click)="logout();" *ngIf="getLoginFlag()"> Sign Out </button>            
        </md-menu>
   </div>

   
   <div class = "left-nav" id = "example-navbar-collapse" *ngIf="showLeftButton">
	   <md-nav-list>
            <a md-list-item [routerLink]="['./user']" *ngIf="getLoginName() === 'ADMIN'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" (click)="showLeftButton = !showLeftButton">Employee Registration</a>

            <a md-list-item [routerLink]="['./customer']" *ngIf="getLoginName() === 'ADMIN'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" (click)="showLeftButton = !showLeftButton">Employess Details</a>

            <a md-list-item [routerLink]="['./dashBoard']" id="dashBoardId" *ngIf="getLoginName() === 'CSR' || getLoginName() === 'EMPLOYEE'" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" (click)="showLeftButton = !showLeftButton">Dash board</a>
       </md-nav-list>
      
   </div>
  
</nav>
		 <div id="container" style="margin-top: -25px;">
		  <router-outlet></router-outlet>
		</div> 
  `
})
export class AppComponent {
    angularclassLogo = 'assets/img/angularclass-avatar.png';
    name = 'Emp App';
    showLeftButton = false;
    showRightButton = false;
    userDetail = {};
    timedOut = false;
    customerList = [];
    filterDetails: any = {};
    dataList = [];
    isReload;
    loginMenu = true;
    allDeviceList = [];
  constructor(public appState: AppState, public router: Router,private idle: Idle, public customerService: EmployeeService, public userService: UserService) {
        idle.setIdle(5);
        idle.setTimeout(900);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onTimeout.subscribe(() => {
            this.timedOut = true;
            this.logout();
        });
        this.isReload = true;
        this.reset();
  }

    reset() {
        this.idle.watch();
        this.timedOut = false;
    }

    ngOnInit() {
        this.isReload = true;
        if (localStorage.getItem('userDetail') != null) {
            this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
        } else {
            this.userDetail = {};
        }
    }
    
    getDeviceType3() {
        let deviceType3Flag;
            if (this.allDeviceList) {
                if (this.allDeviceList.length > 0) {
                    let datalist = this.allDeviceList.filter(
                          (list) => list.deviceType === 3);
                    if (datalist.length > 0) {
                        deviceType3Flag = true;
                    } else {
                        deviceType3Flag = false;
                    }
                } else {
                    deviceType3Flag = false;
                }
            }
        return deviceType3Flag;
    }
  
  toggleNav(type){
	  if (type === 'left') {
		  if (this.showRightButton) {
			  this.showRightButton = !this.showRightButton;
		}
	}
	  
	if (type === 'right') {
		  if (this.showLeftButton) {
			  this.showLeftButton = !this.showLeftButton;
		}
	}
  }
  
  getLoginFlag(){
    if(localStorage.getItem('loginFlag') !== 'true'){
        document.getElementById('appBody').classList.add('body-init');
		this.userDetail = {};
        return false;
    }else{
        document.getElementById('appBody').classList.remove('body-init');
		
		if (localStorage.getItem('userDetail') != null) {
			  this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
            //Following code is added to set drop down.
		   if(this.isReload){
                this.isReload = false;
            }
		  } else {
			  this.userDetail = {};
		  } 
        return true;
    }
  }
  
  getLoginName() {
    return localStorage.getItem('userRole');
  }
  
  logout() {
	  var userDetail:any = JSON.parse(localStorage.getItem('userDetail'));
      let currentState = this;
    this.userService.updateEmployee(userDetail.email).subscribe(function(data){
             localStorage.setItem('loginFlag', 'false');
            localStorage.removeItem('userRole');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userPassword');
            localStorage.removeItem('userName');
            localStorage.removeItem('userDetail');
            currentState.isReload = true;
            currentState.userDetail = {};
            currentState.filterDetails = {};
            currentState.router.navigate(['/']);
         },(err=> {
                    
        }));
      
  }

 account() {
    this.router.navigate(['/account']);
  }
    
}

