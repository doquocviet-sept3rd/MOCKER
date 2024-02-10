import { ModalRef } from '../modal/modal.service';

export abstract class AbstractModal {
  abstract options: any;
  modalInstance!: ModalRef;

  inject(options: any): void {
    this.options = options;
  };

  public close(output?: any): void {
    this.modalInstance.close(output);
  }

  public dismiss(output?: any): void {
    this.modalInstance.dismiss(output);
  }

}
