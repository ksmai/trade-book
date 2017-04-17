import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { PasswordService } from './password.service';

@Component({
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [PasswordService],
})
export class PasswordComponent {
  oldPW: string = '';
  newPW: string = '';
  confirmPW: string = '';
  error: boolean = false;

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private snackbar: MdSnackBar
  ) {
  }

  changePassword(): void {
    this.error = false;
    this.passwordService.update(this.oldPW, this.newPW)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Password changed', null, { duration: 2000 });
          this.router.navigate(['/']);
        } else {
          this.snackbar.open('Invalid password', null, { duration: 2000 });
          this.error = true;
        }
      });
  }
}

