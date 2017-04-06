import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from './user';
import { MyBooksService } from './my-books.service';
import { TradeService } from './trade.service';

@Injectable()
export class AuthService {
  private user: Observable<User>;
  private loadUserStream: Subject<User>;
  private cachedData: User;

  constructor(
    private http: Http,
    private myBooksService: MyBooksService,
    private tradeService: TradeService
  ) {
    this.loadUserStream = new Subject<User>();
    this.user = this.loadUserStream
      .switchMap(user => user ? Observable.of(user) : this.getData())
      .share();
  }

  clearCache(): void {
    this.cachedData = null;
  }

  isLoggedIn(): boolean {
    return !!this.cachedData;
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
        this.cachedData = user;

        return true;
      })
      .catch(() => Observable.of(false));
  }

  logout(): Observable<boolean> {
    return this.http.get('/logout')
      .map(() => {
        this.clearCache();
        this.tradeService.clearCache();
        this.myBooksService.clearCache();
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
        this.cachedData = user;

        return true;
      })
      .catch(() => Observable.of(false));
  }

  loadUser(refresh = false): Observable<User> {
    if (!this.cachedData || refresh) {
      setTimeout(() => this.loadUserStream.next(null), 0);

      return this.user;
    }

    return Observable.of(this.cachedData);
  }

  private getData(): Observable<User> {
    return this.http.get('/me')
      .map(res => this.cachedData = res.json().user)
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

