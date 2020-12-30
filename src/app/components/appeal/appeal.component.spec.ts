import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AppealComponent } from './appeal.component';

describe('AppealComponentComponent', () => {
  let component: AppealComponent;
  let fixture: ComponentFixture<AppealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
      ]
  })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the mode to 1', () => {
    component.SelectMediaFalsehood();
    expect(component.selectMode).toEqual(1);
  });

  it('should set select mode to 2', () => {
    component.SelectPublicFalsehood();
    expect(component.selectMode).toEqual(2);
  });

  it('should reset everything', () => {
    component.ClearNewAppeal();
    expect(component.appealMode).toEqual(0);
    expect(component.selectMode).toEqual(0);
    expect(component.medFalsehood).toBeNull();
    expect(component.pubFalsehood).toBeNull();
  });

  it('should set the appeal mode', () => {
    component.setAppealMode(0);
    expect(component.appealMode).toBe(0);
    expect(component.attemptedSign).toBeFalse();

    component.setAppealMode(1);
    expect(component.appealMode).toBe(1);
    expect(component.attemptedSign).toBeFalse();

  })
});
