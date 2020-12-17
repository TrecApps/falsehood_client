import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { ApproveServiceService } from './approve-service.service';

describe('ApproveServiceService', () => {
  let service: ApproveServiceService;

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
    service = TestBed.inject(ApproveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
