import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ModalProvider } from '../modal/modal.provider';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    @Inject(Injector) private readonly injector: Injector
  ) {
  }

  get modalProvider() {
    return this.injector.get(ModalProvider);
  }

  handleError(error: any): void {
    console.error(error.message);
    // this.modalProvider.error({
    //   description: error.message
    // });
  }
}
