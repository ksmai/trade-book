import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BookComponent } from './book.component';
import { RouterLinkActiveStub } from '../../testing/router-link-active.directive.stub';

let fixture: ComponentFixture<BookComponent>;
let page: Page;

class Page {
  links: DebugElement[];

  createElements() {
    this.links = fixture.debugElement.queryAll(By.css('a'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(BookComponent);
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('BookComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [NoopAnimationsModule],
        declarations: [BookComponent, RouterLinkActiveStub],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should be a shell component with 2 tabs (links)', () => {
    expect(page.links.length).toBe(2);

    const text = page.links
      .map(de => de.nativeElement.textContent)
      .join(', ');

    expect(text).toMatch(/list/i);
    expect(text).toMatch(/my/i);
  });
});

