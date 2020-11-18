import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFalsehoodSearchComponent } from './public-falsehood-search.component';

describe('PublicFalsehoodSearchComponent', () => {
  let component: PublicFalsehoodSearchComponent;
  let fixture: ComponentFixture<PublicFalsehoodSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFalsehoodSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFalsehoodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
