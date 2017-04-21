import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class TradeServiceStub {
  myRequests: any[] = [];
  theirRequests: any[] = [];

  fetchMyRequests(refresh = false) {
    return Observable.of(this.myRequests);
  }

  fetchTheirRequests(refresh = false) {
    return Observable.of(this.theirRequests);
  }

  approveRequest(id: string, approval = true) {
    return Observable.of(true);
  }

  completeRequest(id: string) {
    return Observable.of(true);
  }

  withdrawRequest(id: string) {
    return Observable.of(true);
  }

  createRequest(bookID: string, comment: string) {
    return Observable.of({ _id: '123' });
  }
}

