import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookStream: Observable<[any, Array<any>]>;
  me: string;
  myRequests: Array<any>;
  myBooks: Array<any>;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bookStream = this.activatedRoute.data
      .map(data => data.bookDetail);

    this.subscription = this.activatedRoute.data
      .subscribe(data => {
        this.me = data.user._id;
        this.myRequests = data.myRequests;
        this.myBooks = data.myBooks;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initTrade(bookID: string): void {
    this.router.navigate([
      { outlets: { 'init-trade': ['init-trade', bookID] } },
    ]);
  }
}

