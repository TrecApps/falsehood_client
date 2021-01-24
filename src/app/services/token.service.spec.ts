import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AppModule } from '../app.module';
import { CreateUserObj } from '../models/create-user-obj';
import { LoginObj } from '../models/login-obj';
import { ReturnAccountObj } from '../models/return-account-obj';

import { TokenService } from './token.service';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('TokenService', () => {

  let account: ReturnAccountObj;
  let testController: HttpTestingController;

  beforeAll(() => {
    account = new ReturnAccountObj();
    account.firstname = 'Lord';
    account.lastname = 'Tormontrec';
    account.username = 'tormontrec';
    account.token = 'weiryh.wouergoy.wioeghiuwe'; // I typed at random
  });

  beforeEach(async() =>{
    await TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [ 
      {provide: APP_BASE_HREF, useValue : '/' },
      TokenService
    ]
    }).compileComponents();
    testController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testController.verify();
  })

  it('should be created', () => {
    const service: TokenService = TestBed.inject(TokenService);
    expect(service).toBeTruthy();
  });

  it('should log out!', () => {
    let service: TokenService = TestBed.inject(TokenService);
    service.logout();

    expect(service.userInfo).toBeNull();
    expect(service.credit).toBe(0);
  });

  it('should log in to the system', async()=>{
    let loginObj = new LoginObj();
    loginObj.username = 'tormontrec';
    loginObj.password = 'password'; // Do not use a password like this in real life

    let service: TokenService = TestBed.inject(TokenService);
    service.login(loginObj).then((b) => {
      expect(b).toBeTrue();
    });
    let req = testController.expectOne(environment.FALSEHOOD_URL + "account/LogIn", 'Call to attempt a login');
    req.flush(account);

    await delay(100);
    req = testController.expectOne(environment.FALSEHOOD_URL + "account/Details")
    req.flush(50);

    await delay(100);

    expect(service.credit).toBe(50);
    expect(service.userInfo).toEqual(account);

    service.login(loginObj).then((b) => {
      expect(b).toBeFalse();
    });
    req = testController.expectOne(environment.FALSEHOOD_URL + "account/LogIn", 'Call to attempt a login');
    req.flush(null);
    await delay(100);
  });

  it('should take a created account', async() =>{
    let createObj = new CreateUserObj();
    createObj.username = 'tormontrec';
    createObj.password = 'password'; // Do not use a password like this in real life
    createObj.mainEmail = 'tormontrec@outlook.com';
    createObj.firstName = 'Lord';
    createObj.lastName = 'Tormontrec';


    let service: TokenService = TestBed.inject(TokenService);
    service.create(createObj).then((b) => {
      expect(b).toBeTrue();
    });
    let req = testController.expectOne(environment.FALSEHOOD_URL + "account/CreateUser", 'Call to attempt a login');
    req.flush(account);

    await delay(100);

    expect(service.credit).toBe(5);
    expect(service.userInfo).toEqual(account);

    service.create(createObj).then((b) => {
      expect(b).toBeFalse();
    });
    req = testController.expectOne(environment.FALSEHOOD_URL + "account/CreateUser", 'Call to attempt a login');
    req.flush(null);
    await delay(100);
  });
});
