import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { SearchService } from './search.service';

describe('SearchService', () => {
  

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
  });

  it('should be created', () => {
    const service = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
