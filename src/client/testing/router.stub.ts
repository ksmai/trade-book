import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class RouterStub {
  events = Observable.of({});

  navigate(linkParams: Array<any>) {
  }
}

