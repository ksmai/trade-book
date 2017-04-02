import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    SignupRoutingModule,
  ],

  declarations: [
    SignupComponent,
  ],

  exports: [
    SignupComponent,
  ],
})
export class SignupModule {
}

