import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthServiceStub {
  signup(name: string, pw: string) {
  }

  login(name: string, pw: string) {
  }

  logout() {
    return Observable.of(true);
  }

  loadUser(refresh: boolean = false) {
    return Observable.of(null);
  }
}

