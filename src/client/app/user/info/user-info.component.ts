import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

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

  private displayNameClean: string;
  private emailClean: string;
  private locationClean: string;

  constructor(
    private authService: AuthService,
    private snackbar: MdSnackBar
  ) {
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
    const { displayName, email, location } = this;
    const info = { displayName, email, location };
    this.authService.updateInfo(info)
      .subscribe(user => {
        if (user) {
          this.snackbar.open('Info updated', null, { duration: 1000 });
          this.emailClean = this.email = user.email || '';
          this.locationClean = this.location = user.location || '';
          this.displayNameClean = this.displayName = user.displayName || '';
        } else {
          this.snackbar.open('An error has occured', null, {
            duration: 1000,
          });
        }
      });
  }

  reset(): void {
    this.email = this.emailClean;
    this.location = this.locationClean;
    this.displayName = this.displayNameClean;
  }
}

