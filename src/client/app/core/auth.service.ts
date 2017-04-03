import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

import { User } from './user';

@Injectable()
export class AuthService {
  private user: Observable<User>;
  private loadUserStream: Subject<User>;

  constructor(private http: Http) {
    this.loadUserStream = new Subject<User>();
    this.user = this.loadUserStream
      .switchMap(user => user ? Observable.of(user) : this.getData())
      .share();
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post('/signup', { username, password })
      .map(res => {
        const user = res.json().user;
        this.loadUserStream.next(user);

        return true;
      })
      .catch(() => Observable.of(false));
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/login', { username, password })
      .map(res => {
        const user = res.json().user;
        this.loadUserStream.next(user);

        return true;
      })
      .catch(() => Observable.of(false));
  }

  logout(): Observable<boolean> {
    return this.http.get('/logout')
      .map(() => {
        this.loadUserStream.next(null);

        return true;
      })
      .catch(() => Observable.of(false));
  }

  updateInfo(info: { [key: string]: string }): Observable<boolean> {
    return this.http.put('/api/v1/user', info)
      .map(res => {
        const user = res.json().user;
        this.loadUserStream.next(user);

        return true;
      })
      .catch(() => Observable.of(false));
  }

  loadUser(): Observable<User> {
    setTimeout(() => this.loadUserStream.next(null), 0);

    return this.user;
  }

  private getData(retry = 0): Observable<User> {
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

