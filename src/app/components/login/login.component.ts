import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

import { LoginObj } from '../../models/login-obj';
import { CreateUserObj } from '../../models/create-user-obj';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  setToCreate: boolean;
  canSubmitCreate: boolean;
  showSecurityOptions: boolean;

  login: LoginObj;
  create: CreateUserObj;

  @ViewChild('password1') pass1: ElementRef;
  @ViewChild('password2') pass2: ElementRef;

  constructor(private tokenService: TokenService) { 
    this.setToCreate = false;
    this.canSubmitCreate = false;
    this.showSecurityOptions = false;
    this.login = new LoginObj();
    this.create = new CreateUserObj();
  }

  ngOnInit() {
  }

  redirect() {
    this.setToCreate = !this.setToCreate;
  }

  submitCreate() {

  }

  async submitLogin() {
    if(this.login.password && this.login.username)
    {
      if(this.login.username.includes("@"))
      {
        this.login.email = this.login.username;
        this.login.username = "";
      }
      if(await this.tokenService.login(this.login)) {

      }
      else {

      }
    }
  }

  comparePasswords() {
    
		this.canSubmitCreate = this.pass1.nativeElement.value === this.pass2.nativeElement.value && this.pass2.nativeElement.length > 8;

  }
}
