import { Component, HostBinding } from '@angular/core';

import { fadeInOut } from '../app-routing.animations';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [fadeInOut],
})
export class LandingComponent {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';
}

