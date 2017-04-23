import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropProtocol',
})
export class DropProtocolPipe implements PipeTransform {
  transform(url: string): string {
    return url && url.replace && url.replace(/^https?:/, '');
  }
}

