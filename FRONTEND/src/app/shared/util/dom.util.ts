import { FormGroup } from '@angular/forms';

export class DomUtil {

  static scrollTo(element: any): void {
    if (!element) {
      return;
    }
    element.scrollIntoView();
  }

  static scrollToFirstInvalidControl(formGroup: FormGroup): void {
    const firstInvalidControlName: string = Object.keys(formGroup.controls)
      .find((formControlName: string): boolean => formGroup.get(formControlName)!.invalid)!;
    const nativeElement = document.querySelector(`[formControlName=${firstInvalidControlName}]`);
    this.scrollTo(nativeElement);
  }

}
