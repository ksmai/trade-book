import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ValidateSameDirective } from './validate-same.directive';
import { NameAvailableDirective } from './name-available.directive';
import { MasonryLayoutDirective } from './masonry-layout.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DropProtocolPipe } from './drop-protocol.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],

  declarations: [
    ValidateSameDirective,
    NameAvailableDirective,
    DialogComponent,
    MasonryLayoutDirective,
    DropProtocolPipe,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    ValidateSameDirective,
    NameAvailableDirective,
    DialogComponent,
    MasonryLayoutDirective,
    DropProtocolPipe,
  ],
})
export class SharedModule {
}

