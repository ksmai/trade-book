import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MdDialog, MdSnackBar } from '@angular/material';

import { InitTradeComponent } from './init-trade.component';
import { MaterialModule } from '../../material/material.module';
import { RouterStub } from '../../../testing/router.stub';
import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { TradeService } from '../../core/trade.service';
import { TradeServiceStub } from '../../../testing/trade.service.stub';

let fixture: ComponentFixture<InitTradeComponent>;
let component: InitTradeComponent;
let page: Page;

class Page {
  textarea: DebugElement;
  closeBtn: DebugElement;
  submitBtn: DebugElement;

  navigateSpy: jasmine.Spy;
  dialogSpy: jasmine.Spy;
  snackbarSpy: jasmine.Spy;
  createSpy: jasmine.Spy;

  constructor() {
    this.createSpy = spyOn(TestBed.get(TradeService), 'createRequest')
      .and.callThrough();
    this.snackbarSpy = spyOn(TestBed.get(MdSnackBar), 'open');
    this.navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    this.dialogSpy = spyOn(TestBed.get(MdDialog), 'open')
      .and.returnValue({ afterClosed: () => false });
  }

  createElements() {
    this.textarea = fixture.debugElement.query(By.css('textarea'));
    this.closeBtn = fixture.debugElement.query(By.css('.close-button'));
    this.submitBtn = fixture.debugElement.query(By.css('[type="submit"]'));
  }

  input(comment: string) {
    this.textarea.nativeElement.value = comment;
    this.textarea.triggerEventHandler('input', {
      target: this.textarea.nativeElement,
    });
    fixture.detectChanges();
  }

  submit() {
    this.submitBtn.nativeElement.click();
    fixture.detectChanges();
  }
}

function createComponent() {
  fixture = TestBed.createComponent(InitTradeComponent);
  component = fixture.componentInstance;
  page = new Page();
  TestBed.get(ActivatedRoute).testData = { book: { user: {}, info: {} } };
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('InitTradeComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, FormsModule, NoopAnimationsModule],
        declarations: [InitTradeComponent],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: TradeService, useClass: TradeServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('can only be deactivated if success/ empty comment', () => {
    component.success = true;
    component.comment = '123';
    expect(component.canDeactivate()).toBe(true);

    component.success = false;
    component.comment = '';
    expect(component.canDeactivate()).toBe(true);

    component.success = false;
    component.comment = 'abc';
    expect(component.canDeactivate()).toBe(false);
  });

  it('displays current comment from route params', fakeAsync(() => {
    const cmt = 'My cool COmment';
    TestBed.get(ActivatedRoute).testParams = { comment: cmt };
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(page.textarea.nativeElement.value).toEqual(cmt);
  }));

  it('should close by routing to null', () => {
    page.closeBtn.nativeElement.click();
    expect(page.navigateSpy).toHaveBeenCalledWith([{
      outlets: {
        'init-trade': null,
      },
    }]);
  });

  it('should use tradeService to submit request', () => {
    page.input('my comment');
    page.submit();
    expect(page.createSpy).toHaveBeenCalled();
    expect(page.snackbarSpy).toHaveBeenCalled();
  });
});

