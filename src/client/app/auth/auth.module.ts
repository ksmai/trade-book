import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule,
  ],

  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
  ],

  exports: [
  ],
})
export class AuthModule {
}

