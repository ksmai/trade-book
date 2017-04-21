import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthService } from '../../core/auth.service';
import { AuthServiceStub } from '../../../testing/auth.service.stub';
import { RouterStub } from '../../../testing/router.stub';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../../material/material.module';

let fixture: ComponentFixture<LoginComponent>;
let page: Page;

class Page {
  name: DebugElement;
  pw: DebugElement;
  btn: DebugElement;

  loginSpy: jasmine.Spy;
  snackbarSpy: jasmine.Spy;
  navigateSpy: jasmine.Spy;
  focusSpy: jasmine.Spy;

  constructor() {
    this.loginSpy = spyOn(TestBed.get(AuthService), 'login')
      .and
      .returnValue(Observable.of(true));
    this.snackbarSpy = spyOn(TestBed.get(MdSnackBar), 'open');
    this.navigateSpy = spyOn(TestBed.get(Router), 'navigate');
  }

  createPageElements() {
    [this.name, this.pw] = fixture.debugElement.queryAll(By.css('input'));
    this.btn = fixture.debugElement.query(By.css('button'));
    this.focusSpy = spyOn(this.name.nativeElement, 'focus');
  }

  input(name: string, pw: string) {
    this.name.nativeElement.value = name;
    this.pw.nativeElement.value = pw;
    this.name.triggerEventHandler('input', {
      target: this.name.nativeElement,
    });
    this.pw.triggerEventHandler('input', {
      target: this.pw.nativeElement,
    });
    fixture.detectChanges();

    return this;
  }

  submit() {
    this.btn.nativeElement.click();
    fixture.detectChanges();

    return this;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(LoginComponent);
  page = new Page();
  page.createPageElements();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule, FormsModule],
        declarations: [LoginComponent],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: Router, useClass: RouterStub },
          { provide: AuthService, useClass: AuthServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should set redirect from route params', fakeAsync(() => {
    const route = <any>TestBed.get(ActivatedRoute);
    const comp = <any>fixture.componentInstance;

    const testRoute = 'abc/123';
    expect(comp.redirect).toEqual('/');
    route.testParams = { redirect: testRoute };
    fixture.detectChanges();
    tick();
    expect(comp.redirect).toEqual(testRoute);
  }));

  it('should auto focus the name input', () => {
    expect(page.focusSpy).toHaveBeenCalled();
  });

  it('should use authService to login', () => {
    const name = 'name';
    const pw = 'password';

    page.input(name, pw).submit();
    expect(page.loginSpy).toHaveBeenCalledWith(name, pw);
  });

  it('should navigate and show snackbar after login', () => {
    page.input('name', 'password').submit();
    expect(page.snackbarSpy).toHaveBeenCalled();
    expect(page.navigateSpy).toHaveBeenCalled();
  });
});

