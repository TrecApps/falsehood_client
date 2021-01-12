import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { PublicFigureComponent } from './public-figure.component';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('PublicFigureComponent', () => {
  let component: PublicFigureComponent;
  let fixture: ComponentFixture<PublicFigureComponent>;
  let testController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PublicFigureComponent,
        PublicFalsehoodSearchComponent,
        FalsehoodSearchComponent
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFigureComponent);
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

  it('should reset the new resources', () => {
    component.startCreateNew();
    expect(component.createNew).toBeTrue();

    component.stopCreateNew();
    expect(component.editContents).toBe("");
    expect(component.editName).toBe("");
    expect(component.createNew).toBeFalse();
  });

  it('should add a new Public Figure!', async () => {
    component.editContents = "Content about the Figure!";
    component.editName = "some Figure!";
    component.addNewFig();
    let req = testController.expectOne(environment.FALSEHOOD_URL + 
      "PublicFigure/Add", "Should have submitted Public figure data");

    

    req.flush(true);

    await delay(100);
    
    expect(component.createNew).toBeFalsy();
    expect(component.editContents).toEqual("");
    expect(component.editName).toEqual("");
  });
});
