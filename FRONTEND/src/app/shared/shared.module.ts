import { NgModule } from '@angular/core';
import { ModalServiceModule } from './modal/modal.service';
import { DialogModal } from './modal/dialog/dialog.modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [
    DialogModal
  ],
  imports: [
    ModalServiceModule,
    TranslateModule,
    NgIf
  ]
})
export class SharedModule {
}
