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
import { Institution, InstitutionEntry } from 'src/app/models/institution';
import { ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { PublicFalsehood } from 'src/app/models/publicFalsehood';
import { Region } from 'src/app/models/region';
import { PublicFigure } from 'src/app/models/publicFigure';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('InstitutionComponent', () => {
  let component: InstitutionComponent;
  let fixture: ComponentFixture<InstitutionComponent>;
  let testController: HttpTestingController;

  let falsehoods :PublicFalsehood[] = [];
  
  beforeAll(() => {

    let inst = new Institution();
    inst.approved = 1;
    inst.id = 1;
    inst.name = "Trec-Apps";
    let region1 = new Region();
    region1.approved = 1;
    region1.id = 1;
    region1.name = "Trectopolis";
    let pubfig1 = new PublicFigure();
    pubfig1.approved = 1;
    pubfig1.id = 1;
    pubfig1.firstname = "Lord";
    pubfig1.lastName = "Tormontrec";
    let region2 = new Region();
    region2.approved = 1;
    region2.id = 2;
    region2.name = "Trectopia";
    let pubfig2 = new PublicFigure();
    pubfig2.approved = 1;
    pubfig2.id = 2;
    pubfig2.firstname = "Lord";
    pubfig2.lastName = "Trooper";


    falsehoods = [];

    let falsehood = new PublicFalsehood();
    falsehood.dateMade = new Date();
    falsehood.id = 3;
    falsehood.institution = inst;
    falsehood.official = pubfig1;
    falsehood.officialType = 0;
    falsehood.region = region1;
    falsehood.severity = 2;
    falsehoods.push(falsehood);

    falsehood = new PublicFalsehood();
    falsehood.dateMade = new Date();
    falsehood.id = 5;
    falsehood.institution = inst;
    falsehood.official = pubfig2;
    falsehood.officialType = 0;
    falsehood.region = region2;
    falsehood.severity = 1;
    falsehoods.push(falsehood);
  });

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

  it('Should search for a given institution', async () => {

    component.mainInst = new InstitutionEntry();
    component.mainInst.contents = "Institution contents!";
    component.mainInst.institution = new Institution();
    component.mainInst.institution.approved = 1;
    component.mainInst.institution.id = 1;
    component.mainInst.institution.name = "Trec-Apps";

    component.setMode(2);

    let req = testController.expectOne(environment.FALSEHOOD_URL +
      'PublicFalsehood/searchConfirmed', 'Should Have a call to search for falsehoods');
    
    req.flush(falsehoods);
    await delay(100);
    expect(component.searchComponent.falsehood).toBeNull();
    expect(component.searchComponent.falsehoods).toBe(falsehoods);
  });

});
