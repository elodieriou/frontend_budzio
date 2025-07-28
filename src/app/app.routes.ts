import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/request-password-reset', component: RequestPasswordResetComponent },
    { path: 'auth/reset-password', component: ResetPasswordComponent },
    { path: 'auth/signup', component: SignupComponent },
];
