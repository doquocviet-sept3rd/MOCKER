import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { IS_NOT_NUMBER } from './validator.constant';

export function NumberValidator(): ValidatorFn {
  return (control: AbstractControl): Validators | null => {
    if (isNaN(control.value)) {
      return {
        [IS_NOT_NUMBER]: true
      };
    }
    return null;
  };
}
