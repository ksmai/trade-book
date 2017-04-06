import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
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

