import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { InstitutionComponent } from './institution.component';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('InstitutionComponent', () => {
  let component: InstitutionComponent;
  let fixture: ComponentFixture<InstitutionComponent>;

  let testController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InstitutionComponent,
        PublicFalsehoodSearchComponent
      ],
      imports: [
        HttpClientTestingModule
        ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        PublicFalsehoodSearchComponent,
        TokenService,
        SearchService,
        SubmitService,
        ApproveServiceService
      ]
  })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Set Create New Flag to true', () => {
    component.startCreateNew();
    expect(component.createNew).toBeTrue();
  });

  it('should reset the new resources', () => {
    component.stopCreateNew();
    expect(component.createNew).toBeFalse();
    expect(component.editContents).toBe("");
  });

  it('should set the mode to 1', () => {
    component.setMode(1);
    expect(component.mode).toBe(1);
  });

  it('should add a new institution!', async () => {
    component.editContents = "Content about the institution!";
    component.editName = "some institution!";
    component.addNewInst();
    let req = testController.expectOne(environment.FALSEHOOD_URL + 
      "Update/PublicFalsehood/AddInstitution", "Should have submitted institution data");

    

    req.flush(true);

    await delay(100);
    
    expect(component.createNew).toBeFalsy();
    expect(component.editContents).toEqual("");
    expect(component.editName).toEqual("");
  });

});
