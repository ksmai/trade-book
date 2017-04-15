import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { TradeService } from '../../core/trade.service';

@Component({
  templateUrl: './init-trade.component.html',
  styleUrls: ['./init-trade.component.scss'],
})
export class InitTradeComponent implements OnInit {
  book: Observable<any>;
  tradeID: string;
  comment = '';
  success = false;

  constructor(
    private snackbar: MdSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tradeService: TradeService
  ) {
  }

  canDeactivate() {
    if (this.success || !this.comment) return true;

    return window.confirm('Sure?');
  }

  ngOnInit(): void {
    this.book = this.activatedRoute.data.map(data => data.book);
    this.activatedRoute.params
      .subscribe(params => this.comment = params.comment);
  }

  initTrade(bookID: string): void {
    if (!this.comment) return;

    this.tradeService
      .createRequest(bookID, this.comment)
      .take(1)
      .subscribe(trade => {
        if (trade) {
          this.success = true;
          this.tradeID = trade._id;
          this.snackbar.open('Trade requested', null, { duration: 1000 });
        } else {
          this.snackbar.open('Failed to start the trade', null, {
            duration: 1000,
          });
        }
      });
  }

  view(): void {
    this.router.navigate(['/trade', { id: this.tradeID }])
      .then(() => this.cancel());
  }

  cancel(): void {
    this.router.navigate([{ outlets: { 'init-trade': null } }]);
  }
}

