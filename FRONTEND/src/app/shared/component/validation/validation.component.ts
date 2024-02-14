import { AbstractComponent } from '../../common/abstract.component';
import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-validation',
  templateUrl: 'validation.component.html',
  styleUrls: ['validation.component.scss']
})
export class ValidationComponent extends AbstractComponent implements OnChanges {
  @Input() self!: FormControl<any>;
  @Input() errors: ValidationErrors | null;
  msg: string;

  constructor(
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnChanges(): void {
    if (!this.errors || !Object.keys(this.errors).length) {
      this.msg = '';
      return;
    }
    const firstError: KeyValue<any, any> = {
      key: Object.keys(this.errors)[0],
      value: this.errors[Object.keys(this.errors)[0]]
    };
    this.msg = firstError.value === true ? this.translateService.instant(`error.message.${firstError.key}`) : firstError.value;
  }

  get hidden(): boolean {
    return !this.self.touched && !this.self.dirty;
  }

}
