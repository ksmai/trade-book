import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class SearchBookService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<Array<any>>{
    if (!term) {
      return Observable.of([]);
    }

    const encTerm = encodeURIComponent(term);

    return this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${encTerm}`)
      .map(res => res.json().items as Array<any>)
      .retry(3)
      .catch(() => Observable.of([]));
  }
}

