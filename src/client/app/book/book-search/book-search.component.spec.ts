import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterialModule } from '../../material/material.module';
import { BookSearchComponent } from './book-search.component';
import { SearchBookService } from './search-book.service';

let fixture: ComponentFixture<BookSearchComponent>;
let component: BookSearchComponent;
let page: Page;

class SearchBookServiceStub {
  search(term: string): Observable<any[]> {
    return Observable.of([]);
  }
}

class Page {
  termInput: DebugElement;

  searchSpy: jasmine.Spy;

  constructor() {
    this.searchSpy = spyOn(
      fixture.debugElement.injector.get(SearchBookService),
      'search'
    ).and.callThrough();
  }

  createElements(): void {
    this.termInput = fixture.debugElement.query(By.css('input'));
  }

  search(term: string): void {
    this.termInput.nativeElement.value = term;
    this.termInput.triggerEventHandler('input', {
      target: this.termInput.nativeElement,
    });
    fixture.detectChanges();
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(BookSearchComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('BookSearchComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule],
        declarations: [BookSearchComponent],
        providers: [
          { provide: SearchBookService, useClass: SearchBookServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should search when user types into input box', fakeAsync(() => {
    page.search('my term');
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    expect(page.searchSpy).toHaveBeenCalledWith('my term');
  }));
});

