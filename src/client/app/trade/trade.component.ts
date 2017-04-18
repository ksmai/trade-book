import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
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
  highlight: string;

  @ViewChild('mine') myMasonry: any;
  @ViewChild('theirs') theirMasonry: any;

  constructor(
    private snackbar: MdSnackBar,
    private tradeService: TradeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadMyRequests(true);
    this.loadTheirRequests(true);

    this.activatedRoute.params
      .subscribe((params: Params) => this.highlight = params['id']);
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
          this.snackbar.open('Trade accepted', null, { duration: 2000 });
          this.loadTheirRequests(true);
        }
      });
  }

  reject(id: string): void {
    this.tradeService.approveRequest(id, false)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Trade rejected', null, { duration: 2000 });
          this.loadTheirRequests(true);
        }
      });
  }

  withdraw(id: string): void {
    this.tradeService.withdrawRequest(id)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Trade withdrawn', null, { duration: 2000 });
          this.loadMyRequests(true);
        }
      });
  }

  complete(id: string): void {
    this.tradeService.completeRequest(id)
      .take(1)
      .subscribe(success => {
        if (success) {
          this.snackbar.open('Trade completed', null, { duration: 2000 });
          this.loadMyRequests(true);
        }
      });
  }

  private errorHandler(err: any): Observable<Array<any>> {
    this.snackbar.open('Loading failed', null, { duration: 2000 });
    this.router.navigate(['/']);
    
    return Observable.of([]);
  }

  relayout(evt: any) {
    switch (evt.index) {
      case 0:
        this.myMasonry.updateLayout();
        break;
      case 1:
        this.theirMasonry.updateLayout();
        break;
      default:
        return;
    }
  }
}

