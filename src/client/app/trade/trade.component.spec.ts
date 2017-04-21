import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TradeFilterPipe } from './trade-filter.pipe';
import { TradeService } from '../core/trade.service';
import { TradeServiceStub } from '../../testing/trade.service.stub';
import { RouterStub } from '../../testing/router.stub';
import { ActivatedRouteStub } from '../../testing/activated-route.stub';
import { MaterialModule } from '../material/material.module';
import { TradeComponent } from './trade.component';
import { MasonryLayoutDirectiveStub } from '../../testing/masonry-layout.directive.stub';

let fixture: ComponentFixture<TradeComponent>;
let component: TradeComponent;
let page: Page;

const myRequests: any[] = [
  {
    _id: 1,
    isAccepted: true,
    isRejected: false,
    isCompleted: false,
    book: {
      info: {
        title: 'MY requests',
      },
    },
  },
];

const theirRequests: any[] = [
  {
    _id: 2,
    isAccepted: true,
    isRejected: false,
    isCompleted: false,
    book: {
      info: {
        title: 'THEIR requests',
      },
    },
    requester: {
    },
  },
];

class Page {
  myFetchSpy: jasmine.Spy;
  theirFetchSpy: jasmine.Spy;
  myTab: DebugElement;
  theirTab: DebugElement;
  cards: DebugElement[];
  toggle: DebugElement;

  constructor() {
    this.myFetchSpy = spyOn(
      TestBed.get(TradeService),
      'fetchMyRequests'
    ).and.returnValue(Observable.of(myRequests));
    this.theirFetchSpy = spyOn(
      TestBed.get(TradeService),
      'fetchTheirRequests'
    ).and.returnValue(Observable.of(theirRequests));
  }

  createElements() {
    this.toggle = fixture.debugElement
      .query(By.css('md-slide-toggle label'));
    this.cards = fixture.debugElement.queryAll(By.css('md-card'));
    [this.myTab, this.theirTab] = fixture.debugElement
      .queryAll(By.css('.mat-tab-label'));
  }

  toggleFilter() {
    this.toggle.nativeElement.click();
    fixture.detectChanges();
  }

  swtichToMine() {
    this.myTab.nativeElement.click();
    fixture.detectChanges();
  }

  switchToTheirs() {
    this.theirTab.nativeElement.click();
    fixture.detectChanges();
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TradeComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

@Directive({
  selector: '[routerLink]',
})
class FakeRouterLink {
  @Input() routerLink: any;
}

describe('TradeComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule, FormsModule],
        declarations: [
          TradeComponent,
          TradeFilterPipe,
          MasonryLayoutDirectiveStub,
          FakeRouterLink,
        ],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          { provide: TradeService, useClass: TradeServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should fetch both myRequests and theirRequests on load', () => {
    expect(page.myFetchSpy).toHaveBeenCalledTimes(1);
    expect(page.theirFetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should show my requests by default', () => {
    const titles = page.cards
      .map(de => de.nativeElement.textContent)
      .join(',');
    expect(titles).toMatch(/my\s?request/i);
    expect(titles).not.toMatch(/their\s?request/i);
  });

  it('should show their requests when switched', fakeAsync(() => {
      page.switchToTheirs();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      page.createElements();

      const titles = page.cards
        .map(de => de.nativeElement.textContent)
        .join(',');
      expect(titles).not.toMatch(/my\s?request/i);
      expect(titles).toMatch(/their\s?request/i);
  }));

  it(
    'can toggle the filter for either myRequests/theirRequests',
    fakeAsync(() => {
      expect(component.showMyCompleted).toBe(false, 'my, intial');
      expect(component.showTheirCompleted).toBe(false, 'their, initial');

      page.toggleFilter();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.showMyCompleted).toBe(true, 'my, toggleMe');
      expect(component.showTheirCompleted).toBe(false, 'their, toggleMe');

      page.switchToTheirs();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      page.createElements();
      page.toggleFilter();
      expect(component.showMyCompleted).toBe(true, 'my, toggleThem');
      expect(component.showTheirCompleted).toBe(true, 'their, toggleThem');
    })
  );
});

