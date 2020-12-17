import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { PublicFalsehoodComponent } from './public-falsehood.component';

describe('PublicFalsehoodComponent', () => {
  let component: PublicFalsehoodComponent;
  let fixture: ComponentFixture<PublicFalsehoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
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
});
