import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { AppealComponent } from './appeal.component';

describe('AppealComponentComponent', () => {
  let component: AppealComponent;
  let fixture: ComponentFixture<AppealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppealComponent,
        PublicFalsehoodSearchComponent,
        FalsehoodSearchComponent
      ],
      imports: [
        HttpClientTestingModule
        ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        PublicFalsehoodSearchComponent,
        FalsehoodSearchComponent,
        TokenService,
        SearchService,
        SubmitService,
        ApproveServiceService
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
