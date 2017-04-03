import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookRoutingModule } from './book-routing.module';

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
})
export class BookModule {
}

