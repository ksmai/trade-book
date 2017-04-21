import {
  TestBed,
  async,
  fakeAsync,
  tick,
  ComponentFixture,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterialModule } from '../../material/material.module';
import { RouterStub } from '../../../testing/router.stub';
import { PasswordService } from './password.service';
import { PasswordComponent } from './password.component';
import { ValidatorDirectiveStub } from '../../../testing/validator.directive.stub';

class PasswordServiceStub {
  update(oldPW: string, newPW: string) {
    return Observable.of(true);
  }
}

let fixture: ComponentFixture<PasswordComponent>;
let component: PasswordComponent;
let page: Page;

class Page {
  pwInput: DebugElement;
  newPWInput: DebugElement;
  confirmInput: DebugElement;
  btn: DebugElement;

  snackbarSpy: jasmine.Spy;
  navigateSpy: jasmine.Spy;
  validateSpy: jasmine.Spy;
  updateSpy: jasmine.Spy;

  constructor() {
    this.snackbarSpy = spyOn(TestBed.get(MdSnackBar), 'open');
    this.navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    this.updateSpy = spyOn(
      fixture.debugElement.injector.get(PasswordService),
      'update'
    ).and.callThrough();
  }

  createElements() {
    this.btn = fixture.debugElement.query(By.css('button'));
    [this.pwInput, this.newPWInput, this.confirmInput] = fixture
      .debugElement
      .queryAll(By.css('input'));

    this.validateSpy = spyOn(
      this.newPWInput.injector.get(ValidatorDirectiveStub),
      'validate'
    ).and.returnValue(null);
  }

  input(oldPW: string, newPW: string, confirmPW: string) {
    this.pwInput.nativeElement.value = oldPW;
    this.pwInput.triggerEventHandler('input', {
      target: this.pwInput.nativeElement,
    });
    fixture.detectChanges();

    this.newPWInput.nativeElement.value = newPW;
    this.newPWInput.triggerEventHandler('input', {
      target: this.newPWInput.nativeElement,
    });
    fixture.detectChanges();

    this.confirmInput.nativeElement.value = confirmPW;
    this.confirmInput.triggerEventHandler('input', {
      target: this.confirmInput.nativeElement,
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
  fixture = TestBed.createComponent(PasswordComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('PasswordComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [FormsModule, MaterialModule, NoopAnimationsModule],
        declarations: [PasswordComponent, ValidatorDirectiveStub],
        providers: [
          { provide: Router, useClass: RouterStub }
        ],
      })
      .overrideComponent(PasswordComponent, {
        set: {
          providers: [
            { provide: PasswordService, useClass: PasswordServiceStub },
          ],
        },
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should validate inputs for new passwords', () => {
    page.validateSpy.calls.reset();
    page.input('oldpassword', 'newpassword', 'newpassword2');
    expect(page.validateSpy).toHaveBeenCalled();
  });

  it(
    'should show snackbar and navigate after changing password',
    fakeAsync(() => {
      page.input('password', 'drowssap', 'drowssap')
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      page.submit();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(page.updateSpy).toHaveBeenCalledWith('password', 'drowssap');
      expect(page.snackbarSpy).toHaveBeenCalled();
      expect(page.navigateSpy).toHaveBeenCalled();
    })
  );
});

