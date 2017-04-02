import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule,
  ],

  declarations: [
    LoginComponent,
  ],

  exports: [
    LoginComponent,
  ],
})
export class LoginModule {
}

