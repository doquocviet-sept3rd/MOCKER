import { AbstractModal } from '../../common/abstract.modal';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogOptions } from '../modal.provider';

export enum DialogType {
  CONFIRM = 'CONFIRM',
  ERROR = 'ERROR',
  INFORM = 'INFORM',
  WARN = 'WARN'
}

export interface DialogModalOptions extends DialogOptions {
  type: DialogType;
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: 'dialog.modal.html',
  styleUrls: ['dialog.modal.scss']
})
export class DialogModal extends AbstractModal implements OnInit {
  options: DialogModalOptions;
  title: string;
  type: DialogType;
  bgColor: string;

  constructor(
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.type = this.options.type!;
    this.title = this.options.title || this.translateService.instant(`modal.dialog.title.${this.type}`);
    switch (this.type) {
      case DialogType.CONFIRM:
        this.bgColor = 'bg-primary';
        break;
      case DialogType.ERROR:
        this.bgColor = 'tw-bg-red-400';
        break;
      case DialogType.INFORM:
        this.bgColor = 'tw-bg-blue-400';
        break;
      case DialogType.WARN:
        this.bgColor = 'tw-bg-yellow-400';
        break;
    }
  }

  get hasConfirmButton(): boolean {
    return this.type === DialogType.CONFIRM
      || this.type === DialogType.WARN
      || this.type === DialogType.INFORM;
  }

  get hasCancelButton(): boolean {
    return this.type === DialogType.CONFIRM
      || this.type === DialogType.ERROR;
  }

  onConfirm(): void {
    this.close(true);
  }

  onCancel(): void {
    this.close(false);
  }

}
