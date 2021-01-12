import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';

import { environment } from 'src/environments/environment';
import { MediaOutletComponent } from './media-outlet.component';
import { Falsehood } from 'src/app/models/falsehoods';
import { PublicFigure } from 'src/app/models/publicFigure';
import { MediaOutlet, MediaOutletEntry } from 'src/app/models/mediaOutlet';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('MediaOutletComponent', () => {
  let component: MediaOutletComponent;
  let fixture: ComponentFixture<MediaOutletComponent>;
  let testController: HttpTestingController;

  let falsehoods :Falsehood[] = [];

  beforeAll(()=> {
    let pubfig1 = new PublicFigure();
    pubfig1.approved = 1;
    pubfig1.id = 1;
    pubfig1.firstname = "Lord";
    pubfig1.lastName = "Tormontrec";
    let pubfig2 = new PublicFigure();
    pubfig2.approved = 1;
    pubfig2.id = 2;
    pubfig2.firstname = "Lord";
    pubfig2.lastName = "Trooper";

    let outlet = new MediaOutlet();
    outlet.approved = 1;
    outlet.foundationYear = 2022;
    outlet.name = "Trec-News";
    outlet.outletId = 1;

    falsehoods = [];

    let falsehood = new Falsehood();
    falsehood.author1 = pubfig1;
    falsehood.contentId = "Article1";
    falsehood.dateMade = new Date();
    falsehood.id = 2;
    falsehood.outlet = outlet;
    falsehood.severity = 3;
    falsehoods.push(falsehood);

    falsehood = new Falsehood();
    falsehood.author1 = pubfig2;
    falsehood.contentId = "Article2";
    falsehood.dateMade = new Date();
    falsehood.id = 4;
    falsehood.outlet = outlet;
    falsehood.severity = 4;
    falsehoods.push(falsehood);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[MediaOutletComponent, FalsehoodSearchComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserModule
        ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        TokenService,
        SearchService,
        SubmitService,
        ApproveServiceService,
        FalsehoodSearchComponent
      ]
  }).compileComponents();

    fixture = TestBed.createComponent(MediaOutletComponent);
    component = fixture.componentInstance;
    console.log("Media Outlet BeforeEach component.search 1" + component.searchComponent);
    fixture.detectChanges();
    console.log("Media Outlet BeforeEach component.search 2" + component.searchComponent);
    testController = TestBed.inject(HttpTestingController);
    console.log("testController is " + testController);

    console.log("Media Outlet BeforeEach component.search 3" + component.searchComponent);
  });

  afterEach(() => {
    testController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the contents of new resources', () => {
    component.stopCreateNew();

    expect(component.editContents).toBe("");
    expect(component.editName).toBe("");
    expect(component.createNew).toBeFalse();
  });

  it('should set the mode!', () => {
    component.setMode(1);
    expect(component.mode).toBe(1);

    component.setMode(2);
    expect(component.mode).toBe(2);
  });

  it('should add a new Media Outlet!', async () => {
    component.editContents = "Content about the Outlet!";
    component.editName = "some Outlet!";
    component.addNewOut();
    let req = testController.expectOne(environment.FALSEHOOD_URL + 
      "Update/Falsehood/AddOutlet", "Should have submitted a Region data");
    req.flush(true);

    await delay(100);
    
    expect(component.createNew).toBeFalsy();
    expect(component.editContents).toEqual("");
    expect(component.editName).toEqual("");
  });

  it('Should search for a given Media Outlet', async () => {

    component.mainOutlet = new MediaOutletEntry();
    component.mainOutlet.text = "Outlet contents!";
    component.mainOutlet.outlet = new MediaOutlet();
    component.mainOutlet.outlet.approved = 1;
    component.mainOutlet.outlet.outletId = 1;
    component.mainOutlet.outlet.name = "Trec-News";

    component.setMode(2);

    let req = testController.expectOne(environment.FALSEHOOD_URL +
      'Falsehood/searchConfirmed', 'Should Have a call to search for falsehoods');
    
    req.flush(falsehoods);
    await delay(100);
    expect(component.searchComponent.falsehood).toBeNull();
    expect(component.searchComponent.falsehoods).toBe(falsehoods);
  });
});
