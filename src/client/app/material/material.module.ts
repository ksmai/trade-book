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
  MdCardModule,
} from '@angular/material';

@NgModule({
  exports: [
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

