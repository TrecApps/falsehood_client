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

  async login(login: LoginObj): Promise<boolean> {
    let ret: boolean;
    await this.httpClient.post(environment.FALSEHOOD_URL + "account/LogIn", login).
      toPromise().
      then((resp: ReturnAccountObj) => {
        this.userInfo = resp;

        this.httpHeaders = new HttpHeaders({
          Authorization: this.userInfo.token.toString()
        })

        ret = true;
      }).catch(() => {
        ret = false;
      });

      await this.httpClient.get(environment.FALSEHOOD_URL + "account/Details", {headers: this.httpHeaders}).toPromise().
        then((resp: number) => {this.credit = resp;});

      return ret;
  }

  async create(login: CreateUserObj): Promise<boolean> {
    let ret: boolean;
    await this.httpClient.post(environment.FALSEHOOD_URL + "account/CreateUser", login).
      toPromise().
      then((resp: ReturnAccountObj) => {
        this.userInfo = resp;

        ret = true;
      }).catch(() => {
        ret = false;
      });
      return ret;
  }
}
