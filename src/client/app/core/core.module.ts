import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { NameService } from './name.service';
import { TradeService } from './trade.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  exports: [],

  providers: [
    AuthService,
    NameService,
    TradeService,
  ],
})
export class CoreModule {
}

