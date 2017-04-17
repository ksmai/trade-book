import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Book } from './book';

@Injectable()
export class BookListService {
  private end = false;

  constructor(private http: Http) {
  }

  fetch(skip = 0): Observable<Book[]> {
    if (this.end) {
      return Observable.of([]);
    }

    return this.http
      .get(`/api/v1/book?skip=${skip}&limit=${skip + 12}`)
      .map(res => {
        const books = res.json().books;
        if (books.length === 0) {
          this.end = true;
        }
        
        return books;
      })
      .catch(() => Observable.of([]));
  }
}

