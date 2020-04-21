import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyDdpRtch5oiLpcsN8Qx16rCzd7z7fp2taY';


  //crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //logear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]





  constructor( private httpClient: HttpClient) { }


  login( user: UserModel) {

  }

  logout() {

  }

  register( user: UserModel) {

    const authData = {
      ...user, //trae todas las propiedades del usuario
      returnSecureToken: true
    };

    return this.httpClient.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
    authData
    );
  }
}
