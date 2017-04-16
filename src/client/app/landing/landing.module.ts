import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LandingRoutingModule,
  ],

  declarations: [
    LandingComponent,
  ],

  exports: [
  ],
})
export class LandingModule {
}

