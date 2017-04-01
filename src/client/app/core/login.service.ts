import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserService } from './user.service';

@Injectable()
export class LoginService {
  constructor(private http: Http, private userService: UserService) {
  }

  login(username: string, password: string) {
  }

  logout() {
  }
}

