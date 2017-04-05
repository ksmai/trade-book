import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradeComponent } from './trade.component';

const tradeRoutes: Routes = [
  { path: 'trade', component: TradeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(tradeRoutes),
  ],

  exports: [
    RouterModule,
  ],
})
export class TradeRoutingModule {
}

