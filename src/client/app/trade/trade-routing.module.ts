import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradeComponent } from './trade.component';
import { AuthGuard } from '../core/auth-guard.service';

const tradeRoutes: Routes = [
  { path: 'trade', component: TradeComponent, canActivate: [AuthGuard] },
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

