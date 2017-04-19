import { Component, HostBinding } from '@angular/core';

import { fadeInOut } from '../app-routing.animations';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: [fadeInOut],
})

export class BookComponent {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';
}

