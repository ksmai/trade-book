import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book.component';
import { MyBooksComponent } from './mybooks/my-books.component';
import { BookListComponent } from './booklist/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from '../core/auth-guard.service';
import { TradeService } from '../core/trade.service';
import { AuthService } from '../core/auth.service';
import { MyBooksService } from '../core/my-books.service';
import { BookDetailService } from '../book/book-detail/book-detail.service';

const bookRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'me', component: MyBooksComponent },
      {
        path: '',
        component: BookListComponent,
        children: [
          {
            path: ':volumeID',
            component: BookDetailComponent,
            resolve: {
              bookDetail: BookDetailService,
              user: AuthService,
              myRequests: TradeService,
              myBooks: MyBooksService,
            },
          },
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

