import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retry';

@Injectable()
export class BookDetailService {
  constructor(private http: Http) {
  }

  fetch(volumeID: string): Observable<[any, Array<any>]> {
    const googleBook = this.http
      .get(`https://www.googleapis.com/books/v1/volumes/${volumeID}`)
      .map(res => res.json())
      .retry(3);

    const owners = this.http
      .get(`/api/v1/book/${volumeID}`)
      .map(res => res.json().books)
      .retry(3);

    return Observable
      .combineLatest(googleBook, owners)
      .take(1);
  }
}
