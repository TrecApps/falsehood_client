import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { MediaOutlet } from 'src/app/models/mediaOutlet';
import { PublicFigure } from 'src/app/models/publicFigure';

import { FalsehoodComponent } from './falsehood.component';

describe('FalsehoodComponent', () => {
  let component: FalsehoodComponent;
  let fixture: ComponentFixture<FalsehoodComponent>;

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
    fixture = TestBed.createComponent(FalsehoodComponent);
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

  it('should create an outlet!', () => {
    let mo = new MediaOutlet();
    mo.approved = 0;
    mo.foundationYear = 1999;
    mo.name = "Trec-Apps";
    mo.outletId = null;

    component.startCreateNew();
    component.setNewOutlet(mo);

    expect(component.newFalsehood.metadata.outlet.approved).toEqual(0);
    expect(component.newFalsehood.metadata.outlet.foundationYear).toEqual(mo.foundationYear);
    expect(component.newFalsehood.metadata.outlet.name).toEqual(mo.name);
    expect(component.newFalsehood.metadata.outlet.outletId).toBeNull();
    
  });

  it('should create a public Figure', () => {
    let pf = new PublicFigure();
    pf.approved = 0;
    pf.firstname = "Lord";
    pf.lastName = "Tormontrec";
    pf.id = null;

    component.startCreateNew();
    component.setNewAuthor(pf, 1);

    expect(component.newFalsehood.metadata.author1.approved).toEqual(0);
    expect(component.newFalsehood.metadata.author1.firstname).toEqual(pf.firstname);
    expect(component.newFalsehood.metadata.author1.lastName).toEqual(pf.lastName);
    expect(component.newFalsehood.metadata.author1.id).toBeNull();
    
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

    let mo = new MediaOutlet();
    mo.outletId = 3;
    component.setOutlet(mo);

    let pf = new PublicFigure();
    pf.id = 2;
    component.setAuthor(pf);

    expect(component.search.outlet.outletId).toBe(3);
    expect(component.search.author.id).toBe(2);

  });
});
