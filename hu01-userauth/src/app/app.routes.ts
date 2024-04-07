import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
    { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['/home'])) }
];
