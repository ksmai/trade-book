import { Component, OnInit, HostBinding } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';

import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AuthService } from '../../core/auth.service';
import { fadeInOut } from '../../app-routing.animations';

@Component({
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [fadeInOut],
})
export class UserInfoComponent implements OnInit {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';

  displayName: string;
  email: string;
  location: string;
  ready = false;

  private displayNameClean: string;
  private emailClean: string;
  private locationClean: string;

  constructor(
    private dialog: MdDialog,
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

    const data = {
      title: 'Discard changes?',
      yes: 'Discard',
      no: 'Cancel',
    };

    return this.dialog.open(DialogComponent, { data }).afterClosed();
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
          this.snackbar.open('Info updated', null, { duration: 2000 });
          this.emailClean = this.email = user.email || '';
          this.locationClean = this.location = user.location || '';
          this.displayNameClean = this.displayName = user.displayName || '';
        } else {
          this.snackbar.open('An error has occured', null, {
            duration: 2000,
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

