import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegionComponent } from './components/region/region.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { PublicFigureComponent } from './components/public-figure/public-figure.component';
import { MediaOutletComponent } from './components/media-outlet/media-outlet.component';
import { FalsehoodComponent } from './components/falsehood/falsehood.component';
import { PublicFalsehoodComponent } from './components/public-falsehood/public-falsehood.component';
import { AppealComponent } from './components/appeal/appeal.component';

const routes: Routes = [
	{ path: 'Welcome', component: WelcomeComponent},
    { path: 'Login', component: LoginComponent},
    { path: 'Regions', component: RegionComponent },
    { path: 'Institution', component: InstitutionComponent},
    { path: 'PublicFigure', component: PublicFigureComponent},
    { path: 'MediaOutlet', component: MediaOutletComponent},
    { path: 'Falsehoods', component: FalsehoodComponent},
    { path: 'PublicFalsehoods', component: PublicFalsehoodComponent},
    { path: 'Appeal', component: AppealComponent },
    { path: '',   redirectTo: '/Welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
