import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
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

