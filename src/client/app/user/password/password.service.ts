import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class PasswordService {
  constructor(private http: Http) {
  }

  update(oldPassword: string, newPassword: string): Observable<boolean> {
    return this.http.put('/api/v1/user', { oldPassword, newPassword })
      .map(() => true)
      .retryWhen(this.retry)
      .catch(() => Observable.of(false));
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

