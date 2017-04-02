import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
  ],

  declarations: [
    NavBarComponent,
  ],

  exports: [
    NavBarComponent,
  ],
})
export class NavModule {
}

