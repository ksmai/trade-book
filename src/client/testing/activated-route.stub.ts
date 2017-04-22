import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ActivatedRouteStub {
  params: Observable<any>;
  data: Observable<any>;
  private subject: BehaviorSubject<any>;
  private _testParams: any;
  private _testData: any;

  constructor() {
    this._testParams = {};
    this.subject = new BehaviorSubject(this._testParams);
    this.params = this.subject.asObservable();
    this.data = Observable.of({});
  }

  get testParams() {
    return this._testParams;
  }

  set testParams(params) {
    this._testParams = params;
    this.subject.next(params);
  }

  get testData() {
    return this._testData;
  }

  set testData(data) {
    this._testData = data;
    this.data = Observable.of(this._testData);
  }
}

