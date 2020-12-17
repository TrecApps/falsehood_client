import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SubmitService } from './submit.service';

describe('SubmitService', () => {
  let service: SubmitService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      // declarations: [ LoginComponent ],
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
      ]
  })
  .compileComponents();
    service = TestBed.inject(SubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
