import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '@angular/material';
import { InitTradeComponent } from './init-trade/init-trade.component';
import { TradeComponent } from './trade.component';
import { TradeFilterPipe } from './trade-filter.pipe';
import { TradeRoutingModule } from './trade-routing.module';
import { OwnerResolver } from './init-trade/owner-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MaterialModule,
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

