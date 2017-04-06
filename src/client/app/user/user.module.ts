import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserRoutingModule,
  ],

  declarations: [
    UserInfoComponent,
    PasswordComponent,
  ],

  exports: [
  ],
})
export class UserModule {
}

