import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SignupComponent } from './signup.component';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../core/auth.service';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { RouterStub } from '../../../testing/router.stub';
import { AuthServiceStub } from '../../../testing/auth.service.stub';
import { ValidatorDirectiveStub } from '../../../testing/validator.directive.stub';

let fixture: ComponentFixture<SignupComponent>;
let page: Page;

class Page {
  navigateSpy: jasmine.Spy;
  signupSpy: jasmine.Spy;
  nameSpy: jasmine.Spy;
  pwSpy: jasmine.Spy;
  confirmSpy: jasmine.Spy;
  focusSpy: jasmine.Spy;
  snackbarSpy: jasmine.Spy;

  nameInput: DebugElement;
  pwInput: DebugElement;
  confirmInput: DebugElement;
  button: DebugElement;

  createPageElements() {
    [this.nameInput, this.pwInput, this.confirmInput] = fixture.debugElement
      .queryAll(By.css('input'));

    this.button = fixture.debugElement.query(By.css('button'));
    this.navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    this.signupSpy = spyOn(TestBed.get(AuthService), 'signup')
      .and
      .returnValue(Observable.of(true));
    this.nameSpy = spyOn(
      this.nameInput.injector.get(ValidatorDirectiveStub),
      'validate'
    );
    this.pwSpy = spyOn(
      this.pwInput.injector.get(ValidatorDirectiveStub),
      'validate'
    );
    this.confirmSpy = spyOn(
      this.confirmInput.injector.get(ValidatorDirectiveStub),
      'validate'
    );
    this.focusSpy = spyOn(
      this.nameInput.nativeElement,
      'focus'
    );
    this.snackbarSpy = spyOn(
      fixture.debugElement.injector.get(MdSnackBar),
      'open'
    );
  }
}

function createComponent() {
  fixture = TestBed.createComponent(SignupComponent);
  page = new Page();
  page.createPageElements();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

describe('SignupComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, FormsModule, NoopAnimationsModule],
        declarations: [SignupComponent, ValidatorDirectiveStub],
        providers: [
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should autofocus on name input', () => {
    expect(page.focusSpy).toHaveBeenCalled();
  });

  it('should validate inputs', () => {
    [
      { input: page.nameInput, spy: page.nameSpy, value: 'My Name' },
      { input: page.pwInput, spy: page.pwSpy, value: 'password' },
      { input: page.confirmInput, spy: page.confirmSpy, value: 'password' },
    ].forEach(field => {
      field.spy.calls.reset();
      const nativeEl = field.input.nativeElement;
      nativeEl.value = field.value;
      field.input.triggerEventHandler('input', { target: nativeEl });
      fixture.detectChanges();
      expect(field.spy).toHaveBeenCalled();
    });
  });

  it('should set redirect url from route params', () => {
    expect((<any>fixture.componentInstance).redirect).toEqual('/');

    const route = fixture.debugElement.injector.get(ActivatedRoute);
    const testRoute = 'test/route';
    (<any>route).testParams = { redirect: testRoute };
    expect((<any>fixture.componentInstance).redirect).toEqual(testRoute);
  });

  it('should use authService to signup and navigate', fakeAsync(() => {
    const name = 'MyName';
    const pw = 'password';
    [
      { input: page.nameInput, value: name },
      { input: page.pwInput, value: pw },
      { input: page.confirmInput, value: pw },
    ].forEach(field => {
      const nativeEl = field.input.nativeElement;
      nativeEl.value = field.value;
      field.input.triggerEventHandler('input', { target: nativeEl });
      fixture.detectChanges();
    });
    page.button.nativeElement.click();
    fixture.detectChanges();
    tick();

    expect(page.signupSpy).toHaveBeenCalledWith(name, pw);
    expect(page.navigateSpy).toHaveBeenCalled();
    expect(page.snackbarSpy).toHaveBeenCalled();
  }));
  
});

