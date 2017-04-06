import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavModule } from './nav/nav.module';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { TradeModule } from './trade/trade.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    NavModule,
    LandingModule,
    AuthModule,
    UserModule,
    BookModule,
    TradeModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
}

