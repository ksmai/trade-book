import { NgModule } from '@angular/core';
import {
  MdSlideToggleModule,
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
  MdDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdSlideToggleModule,
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
    MdDialogModule,
  ],
})
export class MaterialModule {
}

