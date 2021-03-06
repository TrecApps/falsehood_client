import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ReturnAccountObj } from '../models/return-account-obj';
import { LoginObj } from '../models/login-obj';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateUserObj } from '../models/create-user-obj';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  userInfo: ReturnAccountObj;

  credit: number;

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.userInfo = new ReturnAccountObj();
    this.credit = 0;
   }

  logout() {
    this.userInfo = null;
    this.credit = 0;
  }

  async login(login: LoginObj): Promise<boolean> {
    let ret: boolean;
    await this.httpClient.post(environment.FALSEHOOD_URL + "account/LogIn", login).
     toPromise().then((resp: ReturnAccountObj) => {
        this.userInfo = resp;

        this.httpHeaders = new HttpHeaders({
          Authorization: this.userInfo.token.toString()
        });
        console.log("Login Worked");
        ret = true;
      }).catch((reason) => {
        console.log(reason);
        ret = false;
      });

      if(ret) {
      await this.httpClient.get(environment.FALSEHOOD_URL + "account/Details", {headers: this.httpHeaders}).toPromise().
        then((resp: number) => {this.credit = resp;});
      } else {
        console.log("Login DID NOT WORK!");
      }
      return ret;
  }

  async create(login: CreateUserObj): Promise<boolean> {
    let ret: boolean;
    await this.httpClient.post(environment.FALSEHOOD_URL + "account/CreateUser", login).
      toPromise().
      then((resp: ReturnAccountObj) => {
        this.userInfo = resp;
        this.httpHeaders = new HttpHeaders({
          Authorization: this.userInfo.token.toString()
        });
        this.credit = 5;
        ret = true;
      }).catch(() => {
        ret = false;
      });
      return ret;
  }
}
