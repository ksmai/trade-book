import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import { SearchBookService } from './search-book.service';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  @Output() selectBook = new EventEmitter<any>();
  searchTermStream = new Subject<string>();

  searchResult: Observable<Array<any>>;
  showResults: boolean;

  constructor(private searchBookService: SearchBookService) {
  }

  ngOnInit(): void {
    this.searchResult = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.searchBookService.search(term));
  }

  search(term: string): void {
    this.searchTermStream.next(term);
  }

  onSelect(book: any): void {
    this.selectBook.emit(book);
  }
}

