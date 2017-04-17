import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ScrollService } from './scroll.service';
import { AuthService } from './auth.service';
import { NameService } from './name.service';
import { TradeService } from './trade.service';
import { MyBooksService } from './my-books.service';
import { AuthGuard } from './auth-guard.service';
import { UnsaveGuard } from './unsave-guard.service';
import {
  defaultRequestOptionsProvider,
} from './default-request-options.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  exports: [],

  providers: [
    AuthGuard,
    AuthService,
    NameService,
    ScrollService,
    TradeService,
    MyBooksService,
    UnsaveGuard,
    defaultRequestOptionsProvider,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('The core module cannot be imported twice.');
    }
  }
}

