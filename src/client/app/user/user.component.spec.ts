import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { UserComponent } from './user.component';
import { RouterLinkActiveStub } from '../../testing/router-link-active.directive.stub';

let fixture: ComponentFixture<UserComponent>;
let page: Page;

class Page {
  links: DebugElement[];

  constructor() {
    this.links = fixture.debugElement.queryAll(By.css('a'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(UserComponent);
  page = new Page();
}

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [UserComponent, RouterLinkActiveStub],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('is a shell component with 2 links: info/password', () => {
    expect(page.links.length).toEqual(2);
    expect(page.links[0].nativeElement.textContent).toMatch(/info/i);
    expect(page.links[1].nativeElement.textContent).toMatch(/password/i);
  });
});

