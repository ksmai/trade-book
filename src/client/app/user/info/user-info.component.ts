import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  displayName: string;
  email: string;
  location: string;
  ready = false;
  error = false;
  success = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loadUser()
      .subscribe(user => {
        this.email = user.email || '';
        this.location = user.location || '';
        this.displayName = user.displayName || '';
        this.ready = true;
      });
  }

  updateInfo(): void {
    this.error = false;
    this.success = false;
    const { displayName, email, location } = this;
    const info = { displayName, email, location };
    this.authService.updateInfo(info)
      .subscribe(success => {
        if (success) {
          this.success = true;
        } else {
          this.error = true;
        }
      });
  }
}

