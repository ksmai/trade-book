import { Component } from '@angular/core';

import { UserService } from './core/user.service';

@Component({
  selector: 'trade-book-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  test = 'Hello World NG2';
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.loadUser();
  }

  reload() {
    this.userService.loadUser();
  }
}

