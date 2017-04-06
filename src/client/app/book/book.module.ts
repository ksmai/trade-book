import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookRoutingModule } from './book-routing.module';
import { SearchBookService } from './search-book.service';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
  ],

  declarations: [
    MyBooksComponent,
    BookListComponent,
    BookDetailComponent,
  ],

  exports: [
  ],

  providers: [
    SearchBookService,
  ],
})
export class BookModule {
}

