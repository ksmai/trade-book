import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book.component';
import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const bookRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    children: [
      { path: 'me', component: MyBooksComponent },
      {
        path: '',
        component: BookListComponent,
        children: [
          { path: ':volumeID', component: BookDetailComponent },
        ],
      },
    ],
  },
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

