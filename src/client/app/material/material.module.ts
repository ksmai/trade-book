import { NgModule } from '@angular/core';
import {
  MdTooltipModule,
  MdInputModule,
  MdTabsModule,
  MdButtonModule,
  MdToolbarModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdSnackBarModule,
  MdCardModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdTooltipModule,
    MdCardModule,
    MdSnackBarModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
  ],
})
export class MaterialModule {
}

