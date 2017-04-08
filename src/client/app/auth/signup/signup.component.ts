import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  password0: string = '';
  password1: string = '';
  error: boolean = false;

  private redirect = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => this.redirect = params['redirect'] || '/'
    );
  }

  signup() {
    this.authService.signup(this.username, this.password0)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.router.navigate([this.redirect]);
        } else {
          this.error = true;
        }
      });
  }
}

