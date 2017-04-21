import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthServiceStub {
  debugSubject = new BehaviorSubject(null);
  user$ = this.debugSubject.asObservable();

  signup(name: string, pw: string) {
  }

  login(name: string, pw: string) {
  }

  logout() {
    return Observable.of(true);
  }

  loadUser(refresh: boolean = false) {
    return this.user$;
  }

  updateInfo(info: { [key: string]: string }) {
    this.debugSubject.next(info);

    return this.user$;
  }
}

