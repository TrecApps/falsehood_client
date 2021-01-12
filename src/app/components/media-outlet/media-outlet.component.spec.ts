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

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('MediaOutletComponent', () => {
  let component: MediaOutletComponent;
  let fixture: ComponentFixture<MediaOutletComponent>;
  let testController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[MediaOutletComponent, FalsehoodSearchComponent],
      imports: [
        HttpClientTestingModule
        ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
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
    fixture = TestBed.createComponent(MediaOutletComponent);
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
});
