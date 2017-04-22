import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterialModule } from '../../material/material.module';
import { BookListComponent } from './book-list.component';
import { RouterStub } from '../../../testing/router.stub';
import { BookListService } from './book-list.service';

let fixture: ComponentFixture<BookListComponent>;
let page: Page;

class Page {
  fetchSpy: jasmine.Spy;

  constructor() {
    this.fetchSpy = spyOn(
      fixture.debugElement.injector.get(BookListService),
      'fetch'
    ).and.callThrough();
  }

  createElements() {
  }
}

class BookListServiceStub {
  fetch(len: any) {
    return Observable.of([]);
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(BookListComponent);
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('BookListComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule],
        declarations: [BookListComponent],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: BookListService, useClass: BookListServiceStub },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should load data on init', () => {
    expect(page.fetchSpy).toHaveBeenCalled();
  });
});

