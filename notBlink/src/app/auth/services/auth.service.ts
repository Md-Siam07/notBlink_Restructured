import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

class AuthRespone {
  token!: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<User | null>(null);
  token$ = new BehaviorSubject<string | null>(null);

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  constructor( private http: HttpClient ) { }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
    this.token$.next(null);
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now()/1000;
    }
    else
      return false;
  }

  signUP(user: User){
    return  this.http.post(
      environment.apiUrl + 'register',
      user,
      this.noAuthHeader
     );
  }

  login(email:string, password: string) {
    return this.http.post<string>(
      environment.apiUrl + 'authenticate',
      {
        email: email,
        password: password
      },
      this.noAuthHeader
    )
    .pipe(
      tap( (resData:any) => {
        console.log("type: ", typeof resData);
        // console.log(resData)
        this.handleAuthentication(resData.token)
      })
    )
  }

  private handleError(){

  }

  private handleAuthentication(token: string){
    console.log(token);
    this.token$.next(token);
  }

}
