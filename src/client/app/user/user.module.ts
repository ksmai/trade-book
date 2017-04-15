import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    UserRoutingModule,
  ],

  declarations: [
    UserComponent,
    UserInfoComponent,
    PasswordComponent,
  ],

  exports: [
  ],
})
export class UserModule {
}

