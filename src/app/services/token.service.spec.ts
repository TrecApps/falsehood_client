import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { TokenService } from './token.service';

describe('TokenService', () => {
  beforeEach(async() =>     await TestBed.configureTestingModule({
    // declarations: [ LoginComponent ],
    imports: [
      AppModule
      ],
    providers: [ {provide: APP_BASE_HREF, useValue : '/' }
    ]
})
.compileComponents());

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });
});
