import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './dashboard.component.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashBoard',
  templateUrl: './dashboard.component.html'
})

export class DashBoardComponent implements OnInit {

    employeeDetailsList = [];
    emptyRecords = true;

  constructor(public route: ActivatedRoute, public dashboardService: DashboardService) {
  }
	
  ngOnInit() {
    var userDetail:any = JSON.parse(localStorage.getItem('userDetail'));
    let currentState  = this;
    
    this.dashboardService.getAllEmployee(userDetail.email).subscribe(function(data){
        currentState.employeeDetailsList = data;
        currentState.emptyRecords = false;
        //console.log(currentState.employeeDetailsList);
     },(err=> {
                    
     }));
  }
     
}
