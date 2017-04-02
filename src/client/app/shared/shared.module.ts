import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ValidateSameDirective } from './validate-same.directive';

@NgModule({
  imports: [
    BrowserModule,
  ],

  declarations: [
    ValidateSameDirective,
  ],

  exports: [
    ValidateSameDirective,
  ],
})
export class SharedModule {
}

