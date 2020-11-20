import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegionComponent } from './components/region/region.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { PublicFigureComponent } from './components/public-figure/public-figure.component';

const routes: Routes = [
	{ path: 'Welcome', component: WelcomeComponent},
    { path: 'Login', component: LoginComponent},
    { path: 'Regions', component: RegionComponent },
    { path: 'Institution', component: InstitutionComponent},
    { path: 'PublicFigure', component: PublicFigureComponent},
    { path: '',   redirectTo: '/Welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
