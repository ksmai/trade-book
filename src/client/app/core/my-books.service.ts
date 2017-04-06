import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class MyBooksService implements Resolve<any> {
  private url = '/api/v1/mybook';
  private myBooks$: Observable<Array<any>>;
  private myBooks: Array<any>;

  constructor(private http: Http) {
  }

  resolve() {
    return this.fetch();
  }

  clearCache(): void {
    this.myBooks$ = null;
    this.myBooks = null;
  }

  fetch(refresh = false): Observable<Array<any>> {
    if (!this.myBooks$ || refresh) {
      this.myBooks$ = this.http
        .get(this.url)
        .map(res => this.myBooks = res.json().books)
        .retryWhen(this.retry)
        .share();
    } else if(this.myBooks) {
      return Observable.of(this.myBooks);
    }

    return this.myBooks$;
  }

  remove(bookID: string): Observable<any> {
    return this.http
      .delete(this.url, { body: { bookID } })
      .retryWhen(this.retry);
  }

  add(volumeID: string): Observable<any> {
    return this.http
      .post(this.url, { volumeID })
      .retryWhen(this.retry);
  }

  private retry(errors: Observable<any>): Observable<any> {
    return errors
      .mergeMap(error => error.status === 401 ?
        Observable.throw(error) :
        Observable.of(error))
      .delay(1000)
      .take(2);
  }
}

