import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';

import { MyBooksService } from '../../core/my-books.service';
import { ScrollService } from '../../core/scroll.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  copies: Array<any>;
  info: any;
  subscription: Subscription;
  owned = false;
  activeDesc: string;

  constructor(
    private snackbar: MdSnackBar,
    private scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private myBooksService: MyBooksService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data
      .subscribe(data => {
        const me = data.user._id;
        const myRequests = data.myRequests;
        const myBooks = data.myBooks;
        this.copies = data.bookDetail[1];
        this.info = data.bookDetail[0];
        this.owned = false;

        this.copies.forEach((copy: any) => {
          if (copy.user._id === me) {
            copy.state = 'owned';
            this.owned = true;

            return;
          }

          const req = myRequests
            .find((req: any) => req.book._id === copy._id);
          if (req) {
            if (req.isCompleted) {
              copy.state = 'completed';
            } else {
              copy.state = 'pending';
              copy.currentComment = req.comment;
            }
          } else {
            copy.state = 'request';
          }
        });

        this.scrollService.scrollTo(0, 0);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initTrade(bookID: string, comment: string = ''): void {
    this.router.navigate([
      { outlets: { 'init-trade': ['init-trade', bookID, { comment }] } },
    ]);
  }

  addBook(): void {
    this.myBooksService
      .add(this.info.id)
      .take(1)
      .subscribe(book => {
        if (book) {
          this.router.navigate(['book', 'me', { id: book._id }]);
          this.snackbar.open('Book added', null, { duration: 2000 });
        }
      });
  }

  onHoverList(evt: any): void {
    const supported = evt && evt.target && evt.target.dataset;
    if (!supported) return;

    if (evt.target.dataset.desc) {
      this.activeDesc = evt.target.dataset.desc;
    } else if(evt.target.parentNode && evt.target.parentNode.dataset.desc) {
      // a workaround for the nested element tags returned from
      // Google API
      this.activeDesc = evt.target.parentNode.dataset.desc;
    }
  }

  onMouseout(): void {
    this.activeDesc = '';
  }
}

