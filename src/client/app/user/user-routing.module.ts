import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';

const userRoutes: Routes = [
  { path: 'info', component: UserInfoComponent },
  { path: 'password', component: PasswordComponent },
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

