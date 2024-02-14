import { FormControl, ValidationErrors } from '@angular/forms';

export class FormUtil {
  static errorClass(self: FormControl<any>, errors: ValidationErrors | null, classes: string): string {
    if (!self || (!self.dirty && !self.touched) || !errors || !Object.keys(errors).length) {
      return '';
    }
    return classes;
  }
}
