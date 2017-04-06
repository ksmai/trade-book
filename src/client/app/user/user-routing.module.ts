import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';
import { AuthGuard } from '../core/auth-guard.service';

const userRoutes: Routes = [
  {
    path: 'setting',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'password', component: PasswordComponent },
          { path: '', component: UserInfoComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
  ],

  exports: [
    RouterModule,
  ],
})
export class UserRoutingModule {
}

