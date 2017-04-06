import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateSameDirective } from './validate-same.directive';
import { NameAvailableDirective } from './name-available.directive';

@NgModule({
  imports: [
    CommonModule,
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

