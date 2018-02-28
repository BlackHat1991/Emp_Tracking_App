import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './_guards';

import { HomeComponent } from './home';
import { AccountComponent } from './account';
import { DashBoardComponent } from './dashBoard';
import { EmployeeComponent } from './employee';
import { UserComponent } from './user';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'dashBoard', component: DashBoardComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }, 
  /*{
    path: 'detail', loadChildren: () => System.import('./detail').then((comp: any) => {
      return comp.default;
    })
    ,
  },*/
  { path: '**',   redirectTo: ''  },
];
