import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { timer } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

import { RegionComponent } from './region.component';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;

  let testController: HttpTestingController;

  beforeEach((async() => {
    await TestBed.configureTestingModule({
      declarations:[
        RegionComponent,
        PublicFalsehoodSearchComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        TokenService,
        SearchService,
        SubmitService,
        ApproveServiceService
      ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionComponent);
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

  it('should set createNew to true', () => {
    component.startCreateNew();
    expect(component.createNew).toBeTruthy();
  });

  it('Should set create new to false and create strings to empty strings!', () => {
    component.stopCreateNew();
    expect(component.createNew).toBeFalsy();
    expect(component.editContents).toEqual("");
    expect(component.editName).toEqual("");
  });

  it('should reset the new resources', () => {
    component.startCreateNew();
    expect(component.createNew).toBeTrue();

    component.stopCreateNew();
    expect(component.editContents).toBe("");
    expect(component.editName).toBe("");
    expect(component.createNew).toBeFalse();
  });

  it('should set the mode to 1', () => {
    component.setMode(1);
    expect(component.mode).toBe(1);
  });

  it('should add a new region!', async () => {
    component.editContents = "Content about the region!";
    component.editName = "some Region!";
    component.addNewReg();
    let req = testController.expectOne(environment.FALSEHOOD_URL + 
      "Update/PublicFalsehood/AddRegion", "Should have submitted a Region data");

    

    req.flush(true);

    await delay(100);
    
    expect(component.createNew).toBeFalsy();
    expect(component.editContents).toEqual("");
    expect(component.editName).toEqual("");
  });
});
