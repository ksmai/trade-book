import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './nav-bar.component';
import { AuthService } from '../core/auth.service';
import { RouterStub } from '../../testing/router.stub';
import { AuthServiceStub } from '../../testing/auth.service.stub';

let fixture: ComponentFixture<NavBarComponent>;
let component: NavBarComponent;
let page: Page;

class Page {
  greeting: DebugElement;
  loginBtn: DebugElement;
  logoutBtn: DebugElement;
  links: DebugElement[];

  createElements() {
    this.greeting = fixture.debugElement.query(By.css('.greeting'));
    this.loginBtn = fixture.debugElement.query(By.css('.login-button'));
    this.logoutBtn = fixture.debugElement.query(By.css('.logout-button'));
    this.links = fixture.debugElement.queryAll(By.css('.main-nav a'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(NavBarComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('NavBarComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule],
        declarations: [NavBarComponent],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: AuthService, useClass: AuthServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should only contain 3 links and login button for guests', () => {
    expect(page.loginBtn).not.toBeNull();
    expect(page.links.length).toEqual(3);
    expect(page.logoutBtn).toBeNull();
    expect(page.greeting).toBeNull();

    const linksText = page.links
      .map(de => de.nativeElement.textContent)
      .join(', ');

    [/home/i, /sign\s*up/i, /log\s*in/i].forEach(regex => {
      expect(linksText).toMatch(regex);
    });
  });

  it(
    'should contain 5 links, logout button and greeting for user',
    fakeAsync(() => {
      const name = 'MY COOL NAME';
      component.userStream = Observable.of({ name });
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      page.createElements();
      expect(page.loginBtn).toBeNull();
      expect(page.logoutBtn).not.toBeNull();
      expect(page.links.length).toEqual(5);
      expect(page.greeting.nativeElement.textContent).toContain(name);

      const linksText = page.links
        .map(de => de.nativeElement.textContent)
        .join('@#$%#');

      [
        /home/i,
        /settings?/i,
        /books?/i,
        /trades?/i,
        /log\s*out/i,
      ].forEach(regex => expect(linksText).toMatch(regex));
    })
  );
});

