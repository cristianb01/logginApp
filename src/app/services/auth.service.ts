import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyDdpRtch5oiLpcsN8Qx16rCzd7z7fp2taY';

  userToken: string;


  //crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //logear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]





  constructor( private httpClient: HttpClient) {
    this.getToken();
   }


  login( user: UserModel) {
    const authData = {
      ...user, //trae todas las propiedades del usuario
      returnSecureToken: true
    };

    return this.httpClient.post
    (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
     authData).pipe(
       map( resp => {
         this.saveToken( resp['idToken']);
         return resp;
       })
     );
  }

  logout() {
    localStorage.removeItem('token');
  }

  register( user: UserModel) {

    const authData = {
      ...user, //trae todas las propiedades del usuario
      returnSecureToken: true
    };

    return this.httpClient.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
    authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken']);
        return resp;
      })
    );
  }


  private saveToken( idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let expireDate = new Date();
    expireDate.setSeconds(3600);

    localStorage.setItem('expireDate', expireDate.getTime().toString());

  }

  getToken() {
    if( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }



  isAuthenticated(): boolean {

    if(this.userToken.length < 2 ) {
      return false;
    }

    const expires = Number (localStorage.getItem('expireDate'));

    const expireDate = new Date();
    expireDate.setTime(expires);

    if(expireDate > new Date()) {
      return true;
    } else {
      return false;
    }


  }

}
