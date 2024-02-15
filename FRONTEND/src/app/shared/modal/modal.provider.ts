import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { DialogModal, DialogModalOptions, DialogType } from './dialog/dialog.modal';

export interface DialogOptions {
  title?: string;
  description?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalProvider {
  options: DialogModalOptions;

  constructor(
    private modalService: ModalService
  ) {
  }

  confirm(dialogOptions: DialogOptions): Observable<any> {
    this.options = {
      ...dialogOptions,
      type: DialogType.CONFIRM
    };
    return this.show(this.options);
  }

  error(dialogOptions: DialogOptions): Observable<any> {
    this.options = {
      ...dialogOptions,
      type: DialogType.ERROR
    };
    return this.show(this.options);
  }

  inform(dialogOptions: DialogOptions): Observable<any> {
    this.options = {
      ...dialogOptions,
      type: DialogType.INFORM
    };
    return this.show(this.options);
  }

  warn(dialogOptions: DialogOptions): Observable<any> {
    this.options = {
      ...dialogOptions,
      type: DialogType.WARN
    };
    return this.show(this.options);
  }

  private show(options: DialogModalOptions): Observable<any> {
    if (!options.description && !options.body) {
      throw new Error('The description or body must be specified');
    }
    return this.modalService.open(DialogModal, options);
  }

}

