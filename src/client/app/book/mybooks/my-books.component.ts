import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { MyBooksService } from '../../core/my-books.service';

@Component({
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit {
  books: Observable<any>;
  highlight: string;
  error = false;

  constructor(
    private myBooksService: MyBooksService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.load(true);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.highlight = params['id'];
    });
  }

  load(refresh = false): void {
    this.books = this.myBooksService
      .fetch(refresh)
      .catch(() => {
        this.error = true;

        return Observable.of([]);
      });
  }

  remove(id: string): void {
    this.myBooksService
      .remove(id)
      .take(1)
      .subscribe(() => this.load(true));
  }

  add(book: any): void {
    this.myBooksService
      .add(book.id)
      .take(1)
      .subscribe(() => this.load(true));
  }
}

