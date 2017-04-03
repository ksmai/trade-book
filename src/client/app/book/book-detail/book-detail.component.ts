import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BookDetailService } from './book-detail.service';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookDetailService],
})
export class BookDetailComponent implements OnInit {
  bookStream: Observable<[any, Array<any>]>;

  constructor(
    private bookDetailService: BookDetailService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bookStream = this.activatedRoute.params.switchMap(
      (params: Params) => this.bookDetailService.fetch(params['volumeID'])
    ).catch(() => {
      this.router.navigate(['/booklist'])

      return Observable.of(null);
    });
  }
}

