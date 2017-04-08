import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  mismatch: boolean = false;

  private redirect = '/';

  constructor(
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
          this.router.navigate([this.redirect]);
        } else {
          this.mismatch = true;
        }
      });
  }
}

