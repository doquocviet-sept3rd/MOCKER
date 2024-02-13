import { NgModule } from '@angular/core';
import { ModalServiceModule } from './modal/modal.service';
import { DialogModal } from './modal/dialog/dialog.modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { ToastComponent } from './common/toastr/toast.component';
import { ValidationDirective } from './directive/validation.directive';

@NgModule({
  declarations: [
    DialogModal,
    ToastComponent,
    ValidationDirective
  ],
  exports: [
    ValidationDirective
  ],
  imports: [
    ModalServiceModule,
    TranslateModule,
    NgIf
  ]
})
export class SharedModule {
}
