import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MdListItem } from '@angular/material';
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
  @Input() customPlaceholder: string;
  @Output() selectBook = new EventEmitter<any>();
  @ViewChild(MdListItem) firstResult: MdListItem;
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
    this.toggleResults(false);
  }

  toggleResults(bool: boolean): void {
    setTimeout(() => this.showResults = bool, 300);
  }

  enter(): void {
    console.log(this.firstResult);
    if (!this.firstResult) return;

    // casting to <any> to access private property _element
    // FIXME: update the component to move complicated logic including
    // observable subsription to javascript so we can just access
    // the search results here
    const evt = new MouseEvent('click', { bubbles: true });
    (<any>this.firstResult)._element.nativeElement.dispatchEvent(evt);
  }
}

