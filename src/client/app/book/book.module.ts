import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookRoutingModule } from './book-routing.module';
import { SearchBookService } from './search-book.service';

@NgModule({
  imports: [
    BrowserModule,
    BookRoutingModule,
  ],

  declarations: [
    MyBooksComponent,
    BookListComponent,
    BookDetailComponent,
  ],

  exports: [
    MyBooksComponent,
    BookListComponent,
    BookDetailComponent,
  ],

  providers: [
    SearchBookService,
  ],
})
export class BookModule {
}

