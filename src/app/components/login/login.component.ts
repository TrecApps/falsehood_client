import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

import { LoginObj } from '../../models/login-obj';
import { CreateUserObj } from '../../models/create-user-obj';
import { Router } from '@angular/router';

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

  constructor(private tokenService: TokenService, private router: Router) { 
    this.setToCreate = false;
    this.canSubmitCreate = false;
    this.showSecurityOptions = false;
    this.login = new LoginObj();
    this.create = new CreateUserObj();
  }

  ngOnInit() {
    if(!this.pass1) {
      this.pass1 = new ElementRef({value: ""});
    }

    
    if(!this.pass2) {
      this.pass2 = new ElementRef({value: ""});
    }
  }

  redirect() {
    this.setToCreate = !this.setToCreate;
  }

  submitCreate() {

    let p =this.tokenService.create(this.create);

    p.then((worked:boolean) => {
      if(!worked) {
        alert("Create Did Not work!");
      } else {
        this.router.navigateByUrl("Welcome");
      }
    }).catch((reason) => {alert(reason)});
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
        this.router.navigateByUrl("Welcome");
      }
      else {

      }
    }
  }

  comparePasswords() {
    
		this.canSubmitCreate = (this.pass1.nativeElement.value === this.pass2.nativeElement.value) && (this.pass2.nativeElement.value.length > 8);

  }
}
