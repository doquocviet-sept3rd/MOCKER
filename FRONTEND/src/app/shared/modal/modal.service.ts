import {
  ApplicationRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  NgModule,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AbstractModal } from '../common/abstract.modal';

// TODO: Upgrade deprecated features

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContainer!: HTMLElement;
  private modalContainerFactory!: ComponentFactory<ModalContainerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {
    this.setupModalContainerFactory();
  }

  public open<T extends AbstractModal>(component: Type<T>, options?: any): Observable<any> {
    this.setupModalContainerDiv();
    const modalContainerRef: ComponentRef<ModalContainerComponent> = this.applicationRef.bootstrap(this.modalContainerFactory, this.modalContainer);
    const modalComponentRef: ComponentRef<T> = modalContainerRef.instance.createModal(component);

    if (options) {
      modalComponentRef.instance.inject(options);
    }

    return new ModalRef(modalContainerRef, modalComponentRef).onResult();
  }

  private setupModalContainerDiv(): void {
    this.modalContainer = document.createElement(`popup`);
    document.body.appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
  }
}

export class ModalRef {

  private result$: Subject<any> = new Subject<any>();

  constructor(
    private modalContainer: ComponentRef<ModalContainerComponent>,
    private modal: ComponentRef<AbstractModal>
  ) {
    this.modal.instance.modalInstance = this;
  }

  public close(output: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  public dismiss(output: any): void {
    this.result$.error(output);
    this.destroy$();
  }

  public onResult(): Observable<any> {
    return this.result$.asObservable();
  }

  private destroy$(): void {
    this.modal.destroy();
    this.modalContainer.destroy();
    this.result$.complete();
  }

}

@Component({
  template: `
    <div class='tw-animate-fade tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2'>
      <ng-template #modalContainer></ng-template>
    </div>
  `
})
export class ModalContainerComponent {

  @ViewChild('modalContainer', { read: ViewContainerRef })
  private modalContainer!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  public createModal<T extends AbstractModal>(component: Type<T>): ComponentRef<T> {
    this.modalContainer.clear();
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.modalContainer.createComponent(factory, 0);
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalContainerComponent
  ]
})
export class ModalServiceModule {
}
