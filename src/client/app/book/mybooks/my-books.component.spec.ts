import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { MyBooksService } from '../../core/my-books.service';
import { MaterialModule } from '../../material/material.module';
import { MyBooksComponent } from './my-books.component';

let fixture: ComponentFixture<MyBooksComponent>;
let page: Page;

class Page {
  fetchSpy: jasmine.Spy;

  constructor() {
    this.fetchSpy = spyOn(
      fixture.debugElement.injector.get(MyBooksService),
      'fetch'
    ).and.callThrough();
  }

  createElements(): void {
  }
}

class MyBooksServiceStub {
  fetch(refresh = false) {
    return Observable.of([]);
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(MyBooksComponent);
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('MyBooksComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [NoopAnimationsModule, MaterialModule],
        declarations: [MyBooksComponent],
        providers: [
          { provide: MyBooksService, useClass: MyBooksServiceStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should fetch data upon load', () => {
    expect(page.fetchSpy).toHaveBeenCalled();
  });
});

