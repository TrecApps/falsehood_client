import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { FalsehoodSearchComponent } from './falsehood-search.component';

describe('FalsehoodSearchComponent', () => {
  let component: FalsehoodSearchComponent;
  let fixture: ComponentFixture<FalsehoodSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
      ]
  })
  .compileComponents();
  fixture = TestBed.createComponent(FalsehoodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
