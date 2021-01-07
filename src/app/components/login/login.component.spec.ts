import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { TokenService } from 'src/app/services/token.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        RouterModule
        ],
        // declarations: [ElementRef],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        TokenService
      ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the create flag', ()=> {
    expect(component.setToCreate).toBeFalse();

    component.redirect();
    expect(component.setToCreate).toBeTrue();
    component.redirect();
    expect(component.setToCreate).toBeFalse();
  });

  it('should make sure passwords are submitable', ()=>{

    component.ngOnInit();


    component.pass1.nativeElement.value = "troops"; // only six characters
    component.pass2.nativeElement.value = "troops"; // make equal, should be false by character length

    component.comparePasswords();
    expect(component.canSubmitCreate).toBeFalse();

    component.pass1.nativeElement.value = "TrecApps-Falsehood";
    component.comparePasswords();
    expect(component.canSubmitCreate).toBeFalse();

    component.pass2.nativeElement.value = "TrecApps-Falsehood";
    component.comparePasswords();
    expect(component.canSubmitCreate).toBeTrue();
  });
});
