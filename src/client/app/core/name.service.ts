import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class NameService {
  private checkStream = new Subject<string>();
  private availability: Observable<boolean>;

  constructor(private http: Http) {
    this.availability = this.checkStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((name: string) => this.check(name))
      .share();
  }

  checkAvailability(name: string): Observable<boolean> {
    setTimeout(() => this.checkStream.next(name), 0);

    return this.availability;
  }

  private check(name: string): Observable<boolean> {
    const encName = encodeURIComponent(name);

    return this.http.get(`/checkname/${encName}`)
      .map(() => true)
      .catch(() => Observable.of(false));
  }
}

