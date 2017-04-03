import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './info/user-info.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    UserRoutingModule,
  ],

  declarations: [
    UserInfoComponent,
    PasswordComponent,
  ],

  exports: [
    UserInfoComponent,
    PasswordComponent,
  ],
})
export class UserModule {
}

