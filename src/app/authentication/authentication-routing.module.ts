import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'not-found', component: NotFoundComponent },
      { path: 'accessdenied', component: AccessDeniedComponent },
      { path: 'error-page', component: ErrorPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'email-confirmation', component: EmailConfirmationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'password-reset', component: PasswordResetComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
export const routedComponents = [LoginComponent, NotFoundComponent, AccessDeniedComponent, ErrorPageComponent];
