import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BookDetailService } from './book-detail.service';
import { AuthService } from '../../core/auth.service';
import { TradeService } from '../../core/trade.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookDetailService],
})
export class BookDetailComponent implements OnInit {
  bookStream: Observable<[any, Array<any>]>;
  me: string;

  constructor(
    private bookDetailService: BookDetailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tradeService: TradeService
  ) {
  }

  ngOnInit(): void {
    this.bookStream = this.activatedRoute.params.switchMap(
      (params: Params) => this.bookDetailService.fetch(params['volumeID'])
    ).catch(() => {
      this.router.navigate(['/booklist'])

      return Observable.of(null);
    });

    this.authService.loadUser()
      .subscribe(user => {
        this.me = user._id;
      });
  }

  initTrade(id: string, comment: string): void {
    this.tradeService.createRequest(id, comment)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/trade']);
        }
      });
  }
}

