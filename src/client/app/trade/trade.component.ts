import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { TradeService } from '../core/trade.service';

@Component({
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
  myRequests: Observable<Array<any>>;
  theirRequests: Observable<Array<any>>;

  constructor(private tradeService: TradeService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadMyRequests(true);
    this.loadTheirRequests(true);
  }

  loadMyRequests(refresh = false): void {
    this.myRequests = this.tradeService.fetchMyRequests(refresh)
      .catch(this.errorHandler);
  }

  loadTheirRequests(refresh = false): void {
    this.theirRequests = this.tradeService.fetchTheirRequests(refresh)
      .catch(this.errorHandler);
  }

  accept(id: string): void {
    this.tradeService.approveRequest(id, true)
      .subscribe(success => {
        if (success) {
          this.loadTheirRequests(true);
        }
      });
  }

  reject(id: string): void {
    this.tradeService.approveRequest(id, false)
      .subscribe(success => {
        if (success) {
          this.loadTheirRequests(true);
        }
      });
  }

  withdraw(id: string): void {
    this.tradeService.withdrawRequest(id)
      .subscribe(success => {
        if (success) {
          this.loadMyRequests(true);
        }
      });
  }

  complete(id: string): void {
    this.tradeService.completeRequest(id)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.loadMyRequests(true);
        }
      });
  }

  private errorHandler(err: any): Observable<Array<any>> {
    this.router.navigate(['/']);
    
    return Observable.of([]);
  }
}

