import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SubmitService } from './submit.service';
import { TokenService } from './token.service';

describe('SubmitService', () => {
  let service: SubmitService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        SubmitService,
        TokenService
      ]
  })
  .compileComponents();
    service = TestBed.inject(SubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
