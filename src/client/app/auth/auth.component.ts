import { Component, HostBinding } from '@angular/core';

import { fadeInOut } from '../app-routing.animations';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeInOut],
})
export class AuthComponent {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';
}

