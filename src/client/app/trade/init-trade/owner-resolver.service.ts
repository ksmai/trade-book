import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retryWhen';

@Injectable()
export class OwnerResolver implements Resolve<any> {
  constructor(private http: Http) {
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    const bookID = activatedRouteSnapshot.params['bookID'];

    return this.http.get(`/api/v1/bookowner/${bookID}`)
      .map(res => res.json().book)
      .retryWhen((errors: Observable<any>) => {
        return errors
          .mergeMap(error => error.status === 400 || error.status === 401 ?
            Observable.throw(error) :
            Observable.of(error))
          .delay(1000)
          .take(2);
      });
  }
}

