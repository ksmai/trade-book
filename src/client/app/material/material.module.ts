import { NgModule } from '@angular/core';
import {
  MdInputModule,
  MdTabsModule,
  MdButtonModule,
  MdToolbarModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdSnackBarModule,
} from '@angular/material';

@NgModule({
  exports: [
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

