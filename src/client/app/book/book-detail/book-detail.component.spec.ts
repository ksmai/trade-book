import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MaterialModule } from '../../material/material.module';
import { BookDetailComponent } from './book-detail.component';
import { ScrollService } from '../../core/scroll.service';
import { RouterStub } from '../../../testing/router.stub';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { ScrollServiceStub } from '../../../testing/scroll.service.stub';
import { MyBooksService } from '../../core/my-books.service';

let fixture: ComponentFixture<BookDetailComponent>;
let page: Page;

class Page {
  scrollSpy: jasmine.Spy;

  constructor() {
    this.scrollSpy = spyOn(TestBed.get(ScrollService), 'scrollTo');
  }

  createElements(): void {
  }
}

class MyBooksServiceStub {
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(BookDetailComponent);
  TestBed.get(ActivatedRoute).testData = {
    user: {},
    myRequests: [],
    myBooks: [],
    bookDetail: [{ volumeInfo: {} }, []],
  };
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('BookDetailComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule],
        declarations: [BookDetailComponent],
        providers: [
          { provide: ScrollService, useClass: ScrollServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: MyBooksService, useClass: MyBooksServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should scroll to top on init', () => {
    expect(page.scrollSpy).toHaveBeenCalledWith(0, 0);
  });
});

