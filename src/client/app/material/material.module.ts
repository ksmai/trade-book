import { NgModule } from '@angular/core';
import {
  MdInputModule,
  MdTabsModule,
  MdButtonModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
  ],
})
export class MaterialModule {
}

