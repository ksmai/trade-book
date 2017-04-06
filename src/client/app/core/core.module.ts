import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { NameService } from './name.service';
import { TradeService } from './trade.service';
import { MyBooksService } from './my-books.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  exports: [],

  providers: [
    AuthGuard,
    AuthService,
    NameService,
    TradeService,
    MyBooksService,
  ],
})
export class CoreModule {
}

