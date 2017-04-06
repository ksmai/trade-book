import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeComponent } from './trade.component';
import { TradeFilterPipe } from './trade-filter.pipe';
import { TradeRoutingModule } from './trade-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TradeRoutingModule,
  ],

  declarations: [
    TradeComponent,
    TradeFilterPipe,
  ],

  exports: [
  ],
})
export class TradeModule {
}

