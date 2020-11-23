import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegionComponent } from './components/region/region.component';

import { MarkedPipe } from './resources/marked.pipe';

import { TokenService } from './services/token.service';
import { InstitutionComponent } from './components/institution/institution.component';
import { FalsehoodSearchComponent } from './components/falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from './components/public-falsehood-search/public-falsehood-search.component';
import { PublicFigureComponent } from './components/public-figure/public-figure.component';
import { MediaOutletComponent } from './components/media-outlet/media-outlet.component';
import { FalsehoodComponent } from './components/falsehood/falsehood.component';

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
    WelcomeComponent,
    RegionComponent,
    MarkedPipe,
    InstitutionComponent,
    FalsehoodSearchComponent,
    PublicFalsehoodSearchComponent,
    PublicFigureComponent,
    MediaOutletComponent,
    FalsehoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
