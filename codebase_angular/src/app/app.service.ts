import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState { 
  _state: InternalStateType = { };
  currentState = {};
   
  apiUrl = 'http://localhost:9090/test';
  constructor(public http: Http) {
    //currentFetches = new Map<String, Promise<Array<boolean>>>();
  }

  // already return a clone of the current state
  get state() { 
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }
  
  setCurrentState(state){ 
    this.currentState = state;
  }
  
  getCurrentState(state){
    return this.currentState;
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }
  
  userLogin(userDetails): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
        //this.toggleState(true);
        this.http.get(this.apiUrl + '/rest/admin/auth/'+userDetails.userName+'/'+userDetails.password)
        // .toRx()
        // Cleanup what is received from the API.
        .map(res => res)
        .subscribe(res => {
            console.log('fetch successfull');
            resolve(res);
        }, error =>  {
            resolve(error);
        })
      });
      return promise;
  }
  
  fetchUserList(): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
        //this.toggleState(true);
        this.http.get(this.apiUrl + '/rest/admin/list')
        // .toRx()
        // Cleanup what is received from the API.
        .map(res => res)
        .subscribe(res => {
            console.log('fetch successfull');
            resolve(res);
        }, error =>  {
            resolve(error);
        })
      });
      return promise;
  }
  
  deleteUserDetails(userId): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
        //this.toggleState(true);
        this.http.get(this.apiUrl + '/rest/admin/delete/'+userId)
        // .toRx()
        // Cleanup what is received from the API.
        .map(res => res)
        .subscribe(res => {
            console.log('fetch successfull');
            resolve(res);
        }, error =>  {
            resolve(error);
        })
      });
      return promise;
  }
  
  createUser(userDetails): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
        //this.toggleState(true);
        this.http.post(this.apiUrl + '/rest/admin/register', userDetails)
        .map(res => res)
        .subscribe(res => {
            console.log('fetch successfull');
            resolve(res);
        }, error =>  {
            resolve(error);
        })
      });
      return promise;
  }

  private handleError(){
    console.log('handle error');
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
