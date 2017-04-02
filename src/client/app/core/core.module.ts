import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { NameService } from './name.service';

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  providers: [
    AuthService,
    NameService,
  ],
})
export class CoreModule {
}

