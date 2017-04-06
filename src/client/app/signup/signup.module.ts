import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    SharedModule,
  ],

  declarations: [
    SignupComponent,
  ],

  exports: [
  ],
})
export class SignupModule {
}

