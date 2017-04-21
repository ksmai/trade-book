import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AuthComponent } from './auth.component';
import { RouterLinkActiveStub } from '../../testing/router-link-active.directive.stub';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [AuthComponent, RouterLinkActiveStub],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    linkDes = fixture.debugElement.queryAll(By.css('a'));
  });

  it('has 2 links (login/signup)', () => {
    expect(linkDes.length).toBe(2);

    const text = linkDes
      .map(de => de.nativeElement.textContent)
      .join(',');
    expect(text).toMatch(/sign\s*up/i);
    expect(text).toMatch(/log\s*in/i);
  });
});

