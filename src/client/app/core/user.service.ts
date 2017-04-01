import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './user';

@Injectable()
export class UserService {
  private user: Observable<User>;
  private loadUserStream: Subject<null>;

  constructor(private http: Http) {
    this.loadUserStream = new Subject<null>();
    this.user = this.loadUserStream.switchMap(() => this.getData());
    this.loadUser();
  }

  loadUser(): Observable<User> {
    this.loadUserStream.next(null);
    this.getData();

    return this.user;
  }

  getData(retry = 0): Observable<User> {
    if (retry > 2) {
      return Observable.of(null);
    }

    return this.http.get('/me')
      .map(res => res.json().user)
      .catch(err => {
        if(err.status === 401) {
          return Observable.of(null);
        }

        return this.getData(retry + 1);
      });
  }
}

