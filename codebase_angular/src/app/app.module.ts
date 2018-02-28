import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {MaterialModule} from '@angular/material';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {BusyModule, BusyConfig} from 'angular2-busy';
import {MomentModule} from 'angular2-moment';
import {NgxPaginationModule} from 'ngx-pagination';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AuthenticationService } from './home/authentication.service';
import { AccountComponent } from './account';
import { CustomerComponent } from './customer';
import { UserComponent } from './user';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashBoardComponent } from './dashBoard';
import { DashboardService } from './dashBoard/dashboard.component.service';
import { CustomerService } from './customer/customer.component.service';
import { GroupService } from './group/group.component.service';
import { CommonService } from './reusableComponents/common.service';
import { UserService } from './user/user.component.service';
import { AuthGuard } from './_guards/index';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AccordionModule} from "ng2-bootstrap";
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  DashboardService,
  CustomerService,
  CommonService,
  UserService,
  AuthenticationService,
  AuthGuard
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({ 
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    NgbModule.forRoot(),
    MaterialModule,
    ChartsModule,
    MultiselectDropdownModule,
    Ng2AutoCompleteModule,
	BusyModule,
	ProgressbarModule.forRoot(),
    Ng2SmartTableModule,
    AccordionModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    AngularMultiSelectModule,
    NgxPaginationModule
  ],	

  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    FileSelectDirective,
    CustomerComponent,
    UserComponent,
    DashBoardComponent,
  ],
	
  bootstrap: [ AppComponent ],
  
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  entryComponents: []
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

