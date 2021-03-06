import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';
import { User } from '../core/user';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userStream: Observable<User>;

  constructor(
    private snackbar: MdSnackBar,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userStream = this.authService.loadUser(true);
  }

  logout(): void {
    this.authService.logout()
      .subscribe(() => {
        this.snackbar.open('Bye!', null, { duration: 1000 });
        this.router.navigate(['/']);
      });
  }
}

