import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[sameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateSameDirective,
      multi: true,
    },
  ],
})
export class ValidateSameDirective implements Validator {
  @Input() sameAs: AbstractControl;

  validate(control: AbstractControl): { [key: string]: any } {
    if (!this.sameAs) {
      return null;
    }

    if (control.value === this.sameAs.value) {
      const revalidate = this.sameAs.errors &&
        this.sameAs.errors['validateSame'] &&
        control.parent instanceof FormGroup;

      // Patch all fields in the form group to force validations
      // on all fields.
      // Otherwise, for a pair of FormControl that uses this
      // directive against each other, there will always be at least
      // one of them with "validateSame" error because Angular
      // only validates the changed field
      if (revalidate) {
        const formGroup: FormGroup = <FormGroup>control.parent;
        const ctrls: { [key: string]: any } = { ...formGroup.controls };
        for(const key in ctrls) {
          ctrls[key] = ctrls[key].value;
        }
        // delay patching to prevent infinite loop
        setTimeout(() => formGroup.patchValue(ctrls), 0);
      }

      return null;
    }

    return { validateSame: true };
  }
}

