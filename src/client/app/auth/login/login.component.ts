import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  mismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.mismatch = true;
        }
      });
  }
}

