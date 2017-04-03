import { Directive } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
} from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import { NameService } from '../core/name.service';

@Directive({
  selector: '[nameAvailable]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: NameAvailableDirective,
      multi: true,
    },
  ],
})
export class NameAvailableDirective implements AsyncValidator {
  constructor(private nameService: NameService) {
  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> {
    return this.nameService.checkAvailability(control.value)
      .map(available => available ? null : { nameAvailable: true })
      .take(1)
      .toPromise();
  }
}

