import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ValidateSameDirective } from './validate-same.directive';
import { NameAvailableDirective } from './name-available.directive';

@NgModule({
  imports: [
    BrowserModule,
  ],

  declarations: [
    ValidateSameDirective,
    NameAvailableDirective,
  ],

  exports: [
    ValidateSameDirective,
    NameAvailableDirective,
  ],
})
export class SharedModule {
}

