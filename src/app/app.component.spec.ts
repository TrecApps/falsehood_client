import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './services/token.service';
import { MarkedPipe } from './resources/marked.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent,
        MarkedPipe ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        TokenService
      ]
  })
  .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trec-apps-falsehood-client-b'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('trec-apps-falsehood-client-b');
  });

  it('should logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;

    app.logout();
    
    expect(app.tokenService.userInfo).toBeNull();
    expect(app.tokenService.credit).toBe(0);
  });

});
