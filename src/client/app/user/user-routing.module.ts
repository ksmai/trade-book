import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';

const userRoutes: Routes = [
  {
    path: 'setting',
    component: UserComponent,
    children: [
      {
        path: '',
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

