import { Injectable } from '@angular/core';
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
export class MyBooksService {
  private url = '/api/v1/mybook';

  constructor(private http: Http) {
  }

  list(): Observable<Array<any>> {
    return this.http
      .get(this.url)
      .map(res => res.json().books)
      .retryWhen(this.retry)
      .share();
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

