import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedFalsehoodsComponent } from './submitted-falsehoods.component';

describe('SubmittedFalsehoodsComponent', () => {
  let component: SubmittedFalsehoodsComponent;
  let fixture: ComponentFixture<SubmittedFalsehoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedFalsehoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedFalsehoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
