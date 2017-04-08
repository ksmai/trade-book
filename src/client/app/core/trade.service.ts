import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class TradeService implements Resolve<any> {
  private url = '/api/v1/trade';
  private myRequests$: Observable<Array<any>>;
  private theirRequests$: Observable<Array<any>>;
  private myRequests: Array<any>;
  private theirRequests: Array<any>;

  constructor(private http: Http) {
  }

  resolve() {
    return this.fetchMyRequests();
  }

  clearCache(): void {
    this.myRequests$ = null;
    this.theirRequests$ = null;
    this.myRequests = null;
    this.theirRequests = null;
  }

  fetchMyRequests(refresh = false): Observable<Array<any>> {
    if (!this.myRequests$ || refresh) {
      this.myRequests$ = this.http
        .get(this.url)
        .map(res => this.myRequests = res.json().trades)
        .retryWhen(this.retry)
        .share();
    } else if (this.myRequests) {
      return Observable.of(this.myRequests);
    }

    return this.myRequests$;
  }

  fetchTheirRequests(refresh = false): Observable<Array<any>> {
    if (!this.theirRequests$ || refresh) {
      this.theirRequests$ = this.http
        .get(`${this.url}?pending=1`)
        .map(res => this.theirRequests = res.json().trades)
        .retryWhen(this.retry)
        .share();
    } else if (this.theirRequests) {
      return Observable.of(this.theirRequests);
    }

    return this.theirRequests$;
  }

  approveRequest(tradeID: string, approval = true): Observable<boolean> {
    return this.http
      .put(this.url, { tradeID, action: approval ? 'accept' : 'reject' })
      .map(() => true)
      .retryWhen(this.retry)
      .catch(() => Observable.of(false));
  }

  completeRequest(tradeID: string): Observable<boolean> {
    return this.http
      .put(this.url, { tradeID, action: 'complete' })
      .map(() => true)
      .retryWhen(this.retry)
      .catch(() => Observable.of(false));
  }

  withdrawRequest(tradeID: string): Observable<boolean> {
    return this.http
      .delete(this.url, { body: { tradeID } })
      .map(() => true)
      .retryWhen(this.retry)
      .catch(() => Observable.of(false));
  }

  createRequest(bookID: string, comment: string): Observable<any> {
    if (!comment.trim()) {
      return Observable.of(false);
    }

    return this.http
      .post(this.url, { bookID, comment: comment.trim() })
      .map(res => res.json().trade)
      .retryWhen(this.retry)
      .catch(() => Observable.of(null));
  }

  private retry(errors: Observable<any>): Observable<any> {
    return errors
      .mergeMap(err => {
        return err.status === 401 || err.status === 400 ?
          Observable.throw(err) :
          Observable.of(err);
      })
      .delay(1000)
      .take(2);
  }
}

