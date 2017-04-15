import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  private redirect = '/';

  constructor(
    private snackbar: MdSnackBar,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => this.redirect = params['redirect'] || '/'
      );
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Welcome back!', null, { duration: 1000 });
          this.router.navigate([this.redirect]);
        } else {
          this.snackbar.open('Invalid username/password', null, {
            duration: 1000,
          });
        }
      });
  }
}

