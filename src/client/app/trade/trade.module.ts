import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TradeComponent } from './trade.component';
import { TradeFilterPipe } from './trade-filter.pipe';
import { TradeRoutingModule } from './trade-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    TradeRoutingModule,
  ],

  declarations: [
    TradeComponent,
    TradeFilterPipe,
  ],

  exports: [
    TradeComponent,
    TradeFilterPipe,
  ],
})
export class TradeModule {
}

