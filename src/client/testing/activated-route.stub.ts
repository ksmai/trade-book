import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivatedRouteStub {
  params: Observable<any>;
  private subject: BehaviorSubject<any>;
  private _testParams: any;

  constructor() {
    this._testParams = {};
    this.subject = new BehaviorSubject(this._testParams);
    this.params = this.subject.asObservable();
  }

  get testParams() {
    return this._testParams;
  }

  set testParams(params) {
    this._testParams = params;
    this.subject.next(params);
  }
}

