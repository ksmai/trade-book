import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ValidateSameDirective } from './validate-same.directive';
import { NameAvailableDirective } from './name-available.directive';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],

  declarations: [
    ValidateSameDirective,
    NameAvailableDirective,
    DialogComponent,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    ValidateSameDirective,
    NameAvailableDirective,
    DialogComponent,
  ],
})
export class SharedModule {
}

