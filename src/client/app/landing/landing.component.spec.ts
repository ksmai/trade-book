import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let fixture: ComponentFixture<LandingComponent>;
  let component: LandingComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [LandingComponent],
    });

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('md-card-title'));
    el = debugEl.nativeElement;
  });

  it('contains the app title', () => {
    expect(el.textContent).toMatch(/book trading app/i);
  });
});

