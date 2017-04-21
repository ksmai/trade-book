import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[masonryLayout]',
  exportAs: 'masonryLayout',
})
export class MasonryLayoutDirectiveStub {
  @Input() masonryLength: number;
  @Input() masonryLayout: number;

  updateLayout(): void {
  }
}

