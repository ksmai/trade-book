import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retry';

@Injectable()
export class BookDetailService implements Resolve<any> {
  constructor(private http: Http) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fetch(route.params['volumeID']);
  }

  fetch(volumeID: string): Observable<[any, Array<any>]> {
    const encID = encodeURIComponent(volumeID);
    const googleBook = this.http
      .get(`https://www.googleapis.com/books/v1/volumes/${encID}`)
      .map(res => res.json())
      .retry(3);

    const owners = this.http
      .get(`/api/v1/book/${encID}`)
      .map(res => res.json().books)
      .retry(3);

    return Observable
      .combineLatest(googleBook, owners)
      .take(1);
  }
}

