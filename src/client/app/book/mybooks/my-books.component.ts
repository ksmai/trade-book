import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import 'rxjs/add/observable/of';

import { MyBooksService } from './my-books.service';
import { SearchBookService } from '../search-book.service';

@Component({
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  providers: [MyBooksService],
})
export class MyBooksComponent implements OnInit {
  books: Observable<any>;
  error = false;

  searchResult: Observable<Array<any>>;
  private searchTermStream = new Subject<string>();

  constructor(
    private myBooksService: MyBooksService,
    private searchBookService: SearchBookService
  ) {
  }

  ngOnInit(): void {
    this.load();

    this.searchResult = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.searchBookService.search(term));
  }

  load(): void {
    this.books = this.myBooksService
    .list()
    .catch(() => {
      this.error = true;

      return Observable.of([]);
    });
  }

  search(term: string): void {
    this.searchTermStream.next(term);
  }

  remove(id: string): void {
    this.myBooksService
      .remove(id)
      .take(1)
      .subscribe(() => this.load());
  }

  add(id: string): void {
    this.myBooksService
      .add(id)
      .take(1)
      .subscribe(() => this.load());
  }
}

