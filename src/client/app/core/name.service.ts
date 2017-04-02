import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Injectable()
export class NameService {
  private checkStream = new Subject<string>();
  private availability: Observable<boolean>;

  constructor(private http: Http) {
    this.availability = this.checkStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((name: string) => this.check(name));
  }

  checkAvailability(name: string): Observable<boolean> {
    this.checkStream.next(name);

    return this.availability;
  }

  private check(name: string): Observable<boolean> {
    return this.http.get(`/checkname/${name}`)
      .map(() => true)
      .catch(() => Observable.of(false));
  }
}

