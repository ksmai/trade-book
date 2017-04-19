import { Component, HostBinding } from '@angular/core';

import { fadeInOut } from '../app-routing.animations';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fadeInOut],
})
export class UserComponent {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';
}

