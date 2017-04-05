import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

import { BookDetailService } from './book-detail.service';
import { AuthService } from '../../core/auth.service';
import { TradeService } from '../../core/trade.service';
import { MyBooksService } from '../../core/my-books.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookDetailService],
})
export class BookDetailComponent implements OnInit {
  bookStream: Observable<[any, Array<any>]>;
  me: string;
  myRequests: Array<any>;
  myBooks: Array<any>;

  constructor(
    private bookDetailService: BookDetailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tradeService: TradeService,
    private myBooksService: MyBooksService
  ) {
  }

  ngOnInit(): void {
    this.bookStream = this.activatedRoute.params.switchMap(
      (params: Params) => this.bookDetailService.fetch(params['volumeID'])
    ).share()
    .catch(() => {
      this.router.navigate(['/booklist'])

      return Observable.of(null);
    });

    this.authService.loadUser()
      .subscribe(user => this.me = user._id);

    this.tradeService.fetchMyRequests()
      .subscribe(myRequests => this.myRequests = myRequests);

    this.myBooksService.fetch()
      .subscribe(myBooks => this.myBooks = myBooks);
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

