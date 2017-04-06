import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';
  password0: string = '';
  password1: string = '';
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  signup() {
    this.authService.signup(this.username, this.password0)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.error = true;
        }
      });
  }
}

