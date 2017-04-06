import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../core/auth-guard.service';

const authRoutes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'new', component: SignupComponent },
          { path: '', component: LoginComponent },
        ],
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
  ],

  exports: [
    RouterModule,
  ],
})
export class AuthRoutingModule {
}

