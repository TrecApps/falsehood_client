import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { ApproveServiceService } from './approve-service.service';
import { TokenService } from './token.service';

describe('ApproveServiceService', () => {
  let service: ApproveServiceService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        ApproveServiceService,
        TokenService
      ]
  })
  .compileComponents();
    service = TestBed.inject(ApproveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
