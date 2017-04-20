import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';

@Directive({
  selector: '[nameAvailable], [sameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatorDirectiveStub,
      multi: true,
    },
  ],
})
export class ValidatorDirectiveStub implements Validator {
  @Input('nameOfOther') unusedField: any;
  @Input('sameAs') unusedFieldAgain: any;

  validate(control: AbstractControl): any {
    return null;
  }
}

