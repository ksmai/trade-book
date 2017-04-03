import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PasswordService {
  constructor(private http: Http) {
  }

  update(oldPassword: string, newPassword: string): Observable<boolean> {
    return this.http.put('/api/v1/user', { oldPassword, newPassword })
      .map(() => true)
      .catch(() => Observable.of(false));
  }
}

