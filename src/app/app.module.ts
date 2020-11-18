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

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
    WelcomeComponent,
    RegionComponent,
    MarkedPipe,
    InstitutionComponent
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
