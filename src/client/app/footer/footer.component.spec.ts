import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer.component';
import { ScrollService } from '../core/scroll.service';
import { ScrollServiceStub } from '../../testing/scroll.service.stub';

let fixture: ComponentFixture<FooterComponent>;
let component: FooterComponent;
let page: Page;
const currentYear = (new Date()).getUTCFullYear();

class Page {
  link: DebugElement;

  createElements() {
    this.link = fixture.debugElement.query(By.css('a'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(FooterComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [MaterialModule],
        declarations: [FooterComponent],
        providers: [
          { provide: ScrollService, useClass: ScrollServiceStub }
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should contain link to github repo', () => {
    expect(page.link.nativeElement.href).toMatch(/^https:\/\/github.com/);
  });

  it('should show author name and current year', () => {
    expect(page.link.nativeElement.textContent).toContain(currentYear);

    expect(page.link.nativeElement.textContent).toContain(component.author);
    const newAuthor = 'ME';
    component.author = newAuthor;
    fixture.detectChanges();
    expect(page.link.nativeElement.textContent).toContain(newAuthor);
  });
});

