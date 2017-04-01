import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { UserService } from './user.service';

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [],
  providers: [
    UserService,
  ],
})
export class CoreModule {
}

