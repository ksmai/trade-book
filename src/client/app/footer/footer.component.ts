import { Component, OnInit } from '@angular/core';

import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year: number;
  author: string;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.year = (new Date()).getFullYear();
    this.author = 'ksmai';
  }

  backToTop(): void {
    this.scrollService.scrollTo(0, 0);
  }

  get showBackToTop(): boolean {
    return window && window.scrollY > 0;
  }
}

