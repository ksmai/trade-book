import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

// import * as Masonry from 'masonry-layout';
// the above does not work for some reasons
const Masonry = require('masonry-layout');

@Directive({
  selector: '[masonryLayout]',
})
export class MasonryLayoutDirective implements OnChanges {
  @Input('masonryLayout') columnWidth: number;
  @Input('masonryLength') length: number;

  private masonry: any;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => this.updateLayout(), 0);
  }

  updateLayout(): void {
    console.log('updating masonry');
    if (this.masonry) {
      this.masonry.reloadItems();
      this.masonry.layout();
    } else {
      this.masonry = new Masonry(this.el.nativeElement, {
        itemSelector: 'md-card',
        columnWidth: this.columnWidth,
        gutter: 30,
      });
    }
  }
}

