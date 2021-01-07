import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { Institution } from 'src/app/models/institution';
import { PublicFigure } from 'src/app/models/publicFigure';
import { Region } from 'src/app/models/region';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { PublicFalsehoodComponent } from './public-falsehood.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('PublicFalsehoodComponent', () => {
  let component: PublicFalsehoodComponent;
  let fixture: ComponentFixture<PublicFalsehoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicFalsehoodComponent,PublicFalsehoodSearchComponent],
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
        PublicFalsehoodSearchComponent
      ]
  })
  .compileComponents();
  fixture = TestBed.createComponent(PublicFalsehoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the date search mode', () => {
    let num = 2;
    component.setDateSearchMode(num);
    expect(component.dateSearchMode).toEqual(num);
    num = 1;
    component.setDateSearchMode(num);
    expect(component.dateSearchMode).toEqual(num);
  });

  it('should clear the "new" resources', () => {
    component.stopCreateNew();
    expect(component.createNew).toBeFalse();
    expect(component.newFalsehood).toBeNull();
  });

  it('should create a public Figure', () => {
    let pf = new PublicFigure();
    pf.approved = 0;
    pf.firstname = "Lord";
    pf.lastName = "Tormontrec";
    pf.id = null;

    component.startCreateNew();
    component.setNewAuthor(pf);

    expect(component.newFalsehood.metadata.official.approved).toEqual(0);
    expect(component.newFalsehood.metadata.official.firstname).toEqual(pf.firstname);
    expect(component.newFalsehood.metadata.official.lastName).toEqual(pf.lastName);
    expect(component.newFalsehood.metadata.official.id).toBeNull();
    
  });

  it('should create a new falsehood', () => {
    component.startCreateNew();

    expect(component.newFalsehood).toBeTruthy();
    expect(component.createNew).toBeTrue();
    expect(component.doSearch).toBeFalse();
    expect(component.newFalsehood).toBeTruthy();
    expect(component.newFalsehood.metadata).toBeTruthy();
    expect(component.newFalsehood.metadata.id).toBeNull();
    expect(component.newFalsehood.metadata.status).toEqual(0);
  });

  it('should set search parameters!', () => {
    component.startSearch();
    expect(component.doSearch).toBeTrue();
    expect(component.search).toBeTruthy();


    let pf = new PublicFigure();
    pf.id = 2;
    component.setAuthor(pf);

    let ins = new Institution();
    ins.name = "Trec-Apps";
    ins.id = 1;
    component.setInst(ins);

    let reg = new Region();
    reg.name = "Trectopolis";
    reg.id = 5;
    component.setReg(reg);

    expect(component.search.official.id).toBe(2);
    expect(component.search.region.id).toBe(5);
    expect(component.search.institution.id).toBe(1);
  });
});
