import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SearchService } from './search.service';

describe('SearchService', () => {
  

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        SearchService
      ]
  })
  .compileComponents();
  });

  it('should be created', () => {
    const service = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
