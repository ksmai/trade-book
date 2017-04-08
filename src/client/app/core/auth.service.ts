import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from './user';
import { MyBooksService } from './my-books.service';
import { TradeService } from './trade.service';

@Injectable()
export class AuthService implements Resolve<User> {
  private subject = new BehaviorSubject<User>(null);
  private inFlight: Observable<User>;

  constructor(
    private http: Http,
    private myBooksService: MyBooksService,
    private tradeService: TradeService
  ) {
  }

  resolve() {
    return this.subject.asObservable().take(1);
  }

  clearCache(): void {
    this.subject.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    if (this.inFlight) {
      return this.inFlight
        .map((user: User) => user ? true : false)
        .catch(() => Observable.of(false));
    }

    return Observable.of(!!this.subject.getValue());
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post('/signup', { username, password })
      .map(res => {
        const user = res.json().user;
        this.subject.next(user);

        return true;
      })
      .take(1)
      .catch(() => Observable.of(false));
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/login', { username, password })
      .map(res => {
        const user = res.json().user;
        this.subject.next(user);

        return true;
      })
      .take(1)
      .catch(() => Observable.of(false));
  }

  logout(): Observable<boolean> {
    return this.http.get('/logout')
      .map(() => {
        this.clearCache();
        this.tradeService.clearCache();
        this.myBooksService.clearCache();

        return true;
      })
      .take(1)
      .catch(() => Observable.of(false));
  }

  updateInfo(info: { [key: string]: string }): Observable<User> {
    return this.http.put('/api/v1/user', info)
      .map(res => {
        const user = res.json().user;
        this.subject.next(user);

        return user;
      })
      .take(1)
      .catch(() => Observable.of(false));
  }

  loadUser(refresh = false): Observable<User> {
    if (refresh) {
      this.inFlight = this.getData().take(1).share();
      this.inFlight.subscribe(user => {
        this.subject.next(user);
        this.inFlight = null;
      });
    }

    return this.subject;
  }

  private getData(): Observable<User> {
    return this.http.get('/me')
      .map(res => res.json().user)
      .retryWhen(this.retry)
      .catch(err => Observable.of(null));
  }

  private retry(errors: Observable<any>): Observable<any> {
    return errors
      .mergeMap(error => error.status === 401 || error.status === 400 ?
        Observable.throw(error) :
        Observable.of(error))
      .delay(1000)
      .take(2);
  }
}

