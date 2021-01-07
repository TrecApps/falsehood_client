import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { MediaOutletComponent } from './media-outlet.component';

describe('MediaOutletComponent', () => {
  let component: MediaOutletComponent;
  let fixture: ComponentFixture<MediaOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[MediaOutletComponent, FalsehoodSearchComponent],
      imports: [
        HttpClientTestingModule
        ],
      providers: [ 
        {provide: APP_BASE_HREF, useValue : '/' },
        FalsehoodSearchComponent,
        TokenService,
        SearchService,
        SubmitService,
        ApproveServiceService
      ]
  })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the contents of new resources', () => {
    component.stopCreateNew();

    expect(component.editContents).toBe("");
    expect(component.editName).toBe("");
    expect(component.createNew).toBeFalse();
  });

  it('should set the mode!', () => {
    component.setMode(1);
    expect(component.mode).toBe(1);

    component.setMode(2);
    expect(component.mode).toBe(2);
  });
});
