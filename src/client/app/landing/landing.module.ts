import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    LandingRoutingModule,
  ],

  declarations: [
    LandingComponent,
  ],

  exports: [
    LandingComponent,
  ],
})
export class LandingModule {
}

