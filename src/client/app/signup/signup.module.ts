import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SignupRoutingModule,
    FormsModule,
    SharedModule,
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

