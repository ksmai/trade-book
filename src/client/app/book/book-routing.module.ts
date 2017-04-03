import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const bookRoutes: Routes = [
  { path: 'mybooks', component: MyBooksComponent },
  { path: 'booklist', component: BookListComponent },
  { path: 'book/:volumeID', component: BookDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(bookRoutes),
  ],

  exports: [
    RouterModule,
  ],
})
export class BookRoutingModule {
}

