import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/auth.service';
import { fadeInOut } from '../../app-routing.animations';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [fadeInOut],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';

  username: string = '';
  password0: string = '';
  password1: string = '';
  @ViewChild('autofocus') autofocus: ElementRef;

  private redirect = '/';

  constructor(
    private snackbar: MdSnackBar,
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

  ngAfterViewInit() {
    setTimeout(() => this.autofocus.nativeElement.focus(), 0);
  }

  signup() {
    this.authService.signup(this.username, this.password0)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Thanks for signing up!', null, {
            duration: 2000,
          });
          this.router.navigate([this.redirect]);
        } else {
          this.snackbar.open('An error has occurred', null, {
            duration: 2000,
          });
        }
      });
  }
}

