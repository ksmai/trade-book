import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdSnackBar } from '@angular/material';

import { MaterialModule } from '../../material/material.module';
import { UserInfoComponent } from './user-info.component';
import { AuthService } from '../../core/auth.service';
import { AuthServiceStub } from '../../../testing/auth.service.stub';

let fixture: ComponentFixture<UserInfoComponent>;
let component: UserInfoComponent;
let page: Page;

class Page {
  emailInput: DebugElement;
  nameInput: DebugElement;
  locationInput: DebugElement;
  submitBtn: DebugElement;
  cancelBtn: DebugElement;

  resetSpy: jasmine.Spy;
  updateSpy: jasmine.Spy;
  snackbarSpy: jasmine.Spy;

  constructor() {
    this.snackbarSpy = spyOn(TestBed.get(MdSnackBar), 'open');
    this.resetSpy = spyOn(component, 'reset').and.callThrough();
    this.updateSpy = spyOn(TestBed.get(AuthService), 'updateInfo')
      .and.callThrough();
  }

  createElements() {
    [
      this.emailInput,
      this.nameInput,
    ] = fixture.debugElement.queryAll(By.css('input'));
    [
      this.submitBtn,
      this.cancelBtn,
    ] = fixture.debugElement.queryAll(By.css('button'));
    this.locationInput = fixture.debugElement.query(By.css('textarea'));
  }

  input(email: string, name: string, location: string) {
    this.emailInput.nativeElement.value = email;
    this.nameInput.nativeElement.value = name;
    this.locationInput.nativeElement.value = location;
    [this.emailInput, this.nameInput, this.locationInput].forEach(input => {
      input.triggerEventHandler('input', {
        target: input.nativeElement,
      });
      fixture.detectChanges();
    });
  }

  submit() {
    this.submitBtn.nativeElement.click();
    fixture.detectChanges();
  }

  cancel() {
    this.cancelBtn.nativeElement.click();
    fixture.detectChanges();
  }
}

const testUser = {
  name: 'cool',
  displayName: 'My Cool Name',
  email: 'cool@example.com',
  location: 'The COOL planet',
};

function createComponent() {
  fixture = TestBed.createComponent(UserInfoComponent);
  component = fixture.componentInstance;
  page = new Page();
  TestBed.get(AuthService).debugSubject.next(testUser);
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('UserInfoComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [FormsModule, NoopAnimationsModule, MaterialModule],
        declarations: [UserInfoComponent],
        providers: [
          { provide: AuthService, useClass: AuthServiceStub },
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should display current info of user', () => {
    expect(page.emailInput.nativeElement.value).toEqual(testUser.email);
    expect(page.nameInput.nativeElement.value)
      .toEqual(testUser.displayName);
    expect(page.locationInput.nativeElement.value)
      .toEqual(testUser.location);
  });

  it('should allow user to cancel and restore previous value', 
    fakeAsync(() => {
      page.input('new@email', 'new name', 'new location');
      expect(page.emailInput.nativeElement.value)
        .not.toEqual(testUser.email);
      expect(page.nameInput.nativeElement.value)
        .not.toEqual(testUser.displayName);
      expect(page.locationInput.nativeElement.value)
        .not.toEqual(testUser.location);

      page.cancel();
      expect(page.resetSpy).toHaveBeenCalled();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(page.emailInput.nativeElement.value).toEqual(testUser.email);
      expect(page.nameInput.nativeElement.value)
        .toEqual(testUser.displayName);
      expect(page.locationInput.nativeElement.value)
        .toEqual(testUser.location);
    })
  );

  it('should submit and update user info', fakeAsync(() => {
    const newInfo = {
      email: 'new@email',
      displayName: 'new Display NAME',
      location: 'My new home',
    };

    page.input(newInfo.email, newInfo.displayName, newInfo.location);
    page.submit();
    expect(page.emailInput.nativeElement.value).toEqual(newInfo.email);
    expect(page.nameInput.nativeElement.value)
      .toEqual(newInfo.displayName);
    expect(page.locationInput.nativeElement.value)
      .toEqual(newInfo.location);

    page.cancel();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(page.emailInput.nativeElement.value).toEqual(newInfo.email);
    expect(page.nameInput.nativeElement.value)
      .toEqual(newInfo.displayName);
    expect(page.locationInput.nativeElement.value)
      .toEqual(newInfo.location);

    expect(page.snackbarSpy).toHaveBeenCalled();
  }));
});

