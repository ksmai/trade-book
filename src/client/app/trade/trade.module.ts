import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InitTradeComponent } from './init-trade/init-trade.component';
import { TradeComponent } from './trade.component';
import { TradeFilterPipe } from './trade-filter.pipe';
import { TradeRoutingModule } from './trade-routing.module';
import { OwnerResolver } from './init-trade/owner-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TradeRoutingModule,
  ],

  declarations: [
    InitTradeComponent,
    TradeComponent,
    TradeFilterPipe,
  ],

  exports: [
  ],

  providers: [
    OwnerResolver,
  ],
})
export class TradeModule {
}

