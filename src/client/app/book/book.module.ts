import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookRoutingModule } from './book-routing.module';
import { SearchBookService } from './book-search/search-book.service';
import { BookDetailService } from './book-detail/book-detail.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    BookRoutingModule,
  ],

  declarations: [
    BookComponent,
    MyBooksComponent,
    BookListComponent,
    BookDetailComponent,
    BookSearchComponent,
  ],

  exports: [
  ],

  providers: [
    SearchBookService,
    BookDetailService,
  ],
})
export class BookModule {
}

