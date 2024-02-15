import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IS_NOT_EQUAL } from './validator.constant';

export function EqualValidator(target: FormControl<any>, message?: string): ValidatorFn {
  return (control: AbstractControl): (ValidationErrors | null) => {
    if (control.value !== target.value) {
      return {
        [IS_NOT_EQUAL]: message || true
      };
    }
    return null;
  };
}
