import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TradeComponent } from './trade.component';
import { InitTradeComponent } from './init-trade/init-trade.component';
import { OwnerResolver } from './init-trade/owner-resolver.service';
import { AuthGuard } from '../core/auth-guard.service';

const tradeRoutes: Routes = [
  { path: 'trade', component: TradeComponent, canActivate: [AuthGuard] },
  {
    path: 'init-trade/:bookID',
    component: InitTradeComponent,
    canActivate: [AuthGuard],
    resolve: [OwnerResolver],
    outlet: 'init-trade',
  },
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

