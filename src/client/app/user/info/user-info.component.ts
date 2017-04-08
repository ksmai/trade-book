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

  private displayNameClean: string;
  private emailClean: string;
  private locationClean: string;

  constructor(private authService: AuthService) {
  }

  canDeactivate() {
    const clean = !this.ready || (
      this.email.trim() === this.emailClean.trim() &&
      this.location.trim() === this.locationClean.trim() &&
      this.displayName.trim() === this.displayNameClean.trim()
    );

    if (clean) return true;

    return new Promise(resolve => resolve(window.confirm('sure?')));
  }

  ngOnInit(): void {
    this.authService.loadUser(true)
      .subscribe(user => {
        this.emailClean = this.email = user.email || '';
        this.locationClean = this.location = user.location || '';
        this.displayNameClean = this.displayName = user.displayName || '';
        this.ready = true;
      });
  }

  updateInfo(): void {
    this.error = false;
    this.success = false;
    const { displayName, email, location } = this;
    const info = { displayName, email, location };
    this.authService.updateInfo(info)
      .subscribe(user => {
        if (user) {
          this.success = true;
          this.emailClean = this.email = user.email || '';
          this.locationClean = this.location = user.location || '';
          this.displayNameClean = this.displayName = user.displayName || '';
        } else {
          this.error = true;
        }
      });
  }
}

