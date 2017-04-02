import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';

const landingRoutes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(landingRoutes),
  ],

  exports: [
    RouterModule,
  ]
})
export class LandingRoutingModule {
}

