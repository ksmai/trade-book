import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './init-trade.component.html',
  styleUrls: ['./init-trade.component.scss'],
})
export class InitTradeComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => console.log(params));
  }
}

