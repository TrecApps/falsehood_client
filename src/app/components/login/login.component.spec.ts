import { APP_BASE_HREF } from '@angular/common';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
        
        ],
        // declarations: [ElementRef],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
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
