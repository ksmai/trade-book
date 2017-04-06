import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    children: [
      {
        path: '',
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

