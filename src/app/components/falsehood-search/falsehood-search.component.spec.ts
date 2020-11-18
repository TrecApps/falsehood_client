import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalsehoodSearchComponent } from './falsehood-search.component';

describe('FalsehoodSearchComponent', () => {
  let component: FalsehoodSearchComponent;
  let fixture: ComponentFixture<FalsehoodSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalsehoodSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalsehoodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
