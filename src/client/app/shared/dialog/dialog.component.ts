import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  yes: string;
  no: string;
  title: string;
  content: string;

  constructor(
    public dialogRef: MdDialogRef<DialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.yes = data.yes || 'Yes';
    this.no = data.no || 'No';
    this.title = data.title || '';
    this.content = data.content || '';
  }
}

