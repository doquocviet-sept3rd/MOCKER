import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[validation]'
})
export class ValidationDirective implements OnInit {
  @Input() formControl: FormControl<any>;
  @Input() self: FormControl<any>;
  @Input() selfClass: string[] = [];
  @Input() errorClass: string[] = [];
  errorElement: HTMLDivElement;

  constructor(
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.errorElement = document.createElement('div');
    if (!this.errorClass.length) {
      this.errorElement.classList.add('tw-text-red-400');
      this.errorElement.classList.add('tw-text-left');
      this.errorElement.classList.add('tw-mt-2');
    } else {
      this.errorClass.forEach((clazz: string): void => this.errorElement.classList.add(clazz));
    }
    if (!this.selfClass.length) {
      // Default self class
    } else {
      this.selfClass.forEach((clazz: string): void => this.elementRef.nativeElement.classList.add(clazz));
    }
    setTimeout((): void => {
      this.errorElement.style.width = this.elementRef.nativeElement.clientWidth + 'px';
    });
    this.elementRef.nativeElement.onblur = (): void => {
      this.errorsChange(this.formControl || this.self);
    };
    if (this.formControl) {
      this.errorsChange(this.formControl);
      this.formControl.statusChanges.subscribe((): void => {
        this.errorsChange(this.formControl);
      });
    } else {
      this.errorsChange(this.self);
      this.self.statusChanges.subscribe((): void => {
        this.errorsChange(this.self);
      });
    }
  }

  errorsChange(control: FormControl<any>): void {
    if (!control.touched && !control.dirty) {
      return;
    }
    const errors: ValidationErrors | null = control.errors;
    if (!errors || !Object.keys(errors).length) {
      // Errors are empty
      this.elementRef.nativeElement.classList.remove('tw-border-red-500');
      this.errorElement.remove();
      return;
    }
    const firstError: KeyValue<any, any> = {
      key: Object.keys(errors)[0],
      value: errors[Object.keys(errors)[0]]
    };
    this.errorElement.textContent = firstError.value === true ? this.translateService.instant(`error.message.${firstError.key}`) : firstError.value;
    if (this.elementRef.nativeElement.nextSibling !== this.errorElement) {
      this.elementRef.nativeElement.classList.add('tw-border-red-500');
      this.elementRef.nativeElement.after(this.errorElement);
    }
  }

}
