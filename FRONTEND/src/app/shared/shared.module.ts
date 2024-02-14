import { NgModule } from '@angular/core';
import { ModalServiceModule } from './modal/modal.service';
import { DialogModal } from './modal/dialog/dialog.modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { ToastComponent } from './common/toastr/toast.component';
import { ValidationDirective } from './directive/validation.directive';
import { ValidationComponent } from './component/validation/validation.component';

@NgModule({
  declarations: [
    DialogModal,
    ToastComponent,
    ValidationDirective,
    ValidationComponent
  ],
  exports: [
    ValidationDirective,
    ValidationComponent
  ],
  imports: [
    ModalServiceModule,
    TranslateModule,
    NgIf
  ]
})
export class SharedModule {
}
