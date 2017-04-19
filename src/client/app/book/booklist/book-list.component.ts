import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { BookListService } from './book-list.service';
import { Book } from './book';
import { fadeInOut } from '../../app-routing.animations';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookListService],
  animations: [fadeInOut],
})
export class BookListComponent implements OnInit {
  @HostBinding('@fadeInOut') fadeInOut = true;
  @HostBinding('style.display') display = 'block';

  books: Book[] = [];
  hasDetail: boolean;

  constructor(
    private bookListService: BookListService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.load();
    this.router.events.subscribe((evt: any) => {
      this.hasDetail = evt.urlAfterRedirects !== '/book';
    });
  }

  load(): void {
    this.bookListService
      .fetch(this.books.length)
      .subscribe(books => {
        const ids = this.books.map(book => book._id);
        const newBooks = books.filter(book => !~ids.indexOf(book._id));
        this.books.push(...newBooks);
      });
  }

  gotoBook(book: any): void {
    const volumeID = book.volumeID || book.id;
    this.router.navigate(['/book', volumeID]);
  }
}

