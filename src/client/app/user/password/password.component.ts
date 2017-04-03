import { Component } from '@angular/core';

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
  success: boolean = false;

  constructor(private passwordService: PasswordService) {
  }

  changePassword(): void {
    this.error = false;
    this.passwordService.update(this.oldPW, this.newPW)
      .subscribe(success => {
        if (success) {
          this.success = true;
        } else {
          this.error = true;
        }
      });
  }
}

