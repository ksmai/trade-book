import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tradeFilter',
})
export class TradeFilterPipe implements PipeTransform {
  transform(trades: Array<any>, field: string, bool = true): Array<any> {
    return trades && trades.filter(trade => !!trade[field] === bool);
  }
}

