import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  nameInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  confirmInput: HTMLInputElement;
  button: DebugElement;

  createPageElements() {
    [this.nameInput, this.pwInput, this.confirmInput] = fixture.debugElement
      .queryAll(By.css('input'))
      .map(debugEl => debugEl.nativeElement);

    this.button = fixture.debugElement.query(By.css('button'));
    this.navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    this.signupSpy = spyOn(TestBed.get(AuthService), 'signup');
  }
}

function createComponent() {
  fixture = TestBed.createComponent(SignupComponent);
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createPageElements();
  });
}

// TODO
xdescribe('SignupComponent', () => {
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

  it('pass', () => 0);
  
});

