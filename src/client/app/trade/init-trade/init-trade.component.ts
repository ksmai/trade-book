import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TradeService } from '../../core/trade.service';

@Component({
  templateUrl: './init-trade.component.html',
  styleUrls: ['./init-trade.component.scss'],
})
export class InitTradeComponent implements OnInit {
  book: Observable<any>;
  comment = '';
  success = false;
  error = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tradeService: TradeService
  ) {
  }

  ngOnInit(): void {
    this.book = this.activatedRoute.data.map(data => data.book);
  }

  initTrade(bookID: string): void {
    this.error = false;
    if (!this.comment) return;

    this.tradeService
      .createRequest(bookID, this.comment)
      .take(1)
      .subscribe((success: boolean) => {
        if (success) {
          this.success = true;
        } else {
          this.error = true;
        }
      });
  }

  view(): void {
    this.router.navigate(['/trade']);
    this.cancel();
  }

  cancel(): void {
    this.router.navigate([{ outlets: { 'init-trade': null } }]);
  }
}

