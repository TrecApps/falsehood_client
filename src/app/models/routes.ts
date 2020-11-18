
import { Routes } from '@angular/router';

import { WelcomeComponent } from '../components/welcome/welcome.component';
import { LoginComponent } from '../components/login/login.component';
import { RegionComponent } from '../components/region/region.component';


export const routes: Routes = [
    { path: 'Welcome', component: WelcomeComponent},
    { path: 'Login', component: LoginComponent},
    { path: 'Regions', component: RegionComponent },
    { path: '',   redirectTo: '/Welcome', pathMatch: 'full'}
];

