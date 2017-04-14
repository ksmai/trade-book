import { NgModule } from '@angular/core';
import { MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

@NgModule({
  exports: [
    MdInputModule,
    MdButtonModule,
  ],
})
export class MaterialModule {
}

