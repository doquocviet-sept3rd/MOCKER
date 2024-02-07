import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function EqualValidator(target: FormControl): ValidatorFn {
  return (control: AbstractControl): (ValidationErrors | null) => {
    let currentErrors = {
      ...control.errors
    };
    if (control.value !== target.value) {
      currentErrors = {
        ...currentErrors,
        isNotEqual: control.value
      };
    }
    return currentErrors;
  };
}
