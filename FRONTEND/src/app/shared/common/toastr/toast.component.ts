import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export enum ToastType {
  SUCCESS = 'toast-success',
  ERROR = 'toast-error',
  WARNING = 'toast-warning',
  INFO = 'toast-info'
}

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html',
  styleUrls: ['toast.component.scss']
})
export class ToastComponent extends Toast implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  toastType: ToastType;
  icon: string;
  bgColor: string;
  containerWith: number;

  constructor(
    toastService: ToastrService,
    toastPackage: ToastPackage,
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(toastService, toastPackage);
  }

  ngOnInit(): void {
    this.toastType = this.toastPackage.toastType as ToastType;
    switch (this.toastType) {
      case ToastType.SUCCESS:
        this.icon = 'assets/material/icons/tick.png';
        this.title = this.title || this.translateService.instant('component.toast.title.success');
        this.bgColor = 'bg-primary';
        break;
      case ToastType.ERROR:
        this.icon = 'assets/material/icons/error.png';
        this.title = this.title || this.translateService.instant('component.toast.title.error');
        this.bgColor = 'tw-bg-red-400';
        break;
      case ToastType.WARNING:
        this.icon = 'assets/material/icons/warning.png';
        this.title = this.title || this.translateService.instant('component.toast.title.warning');
        this.bgColor = 'tw-bg-yellow-400';
        break;
      case ToastType.INFO:
        this.icon = 'assets/material/icons/info.png';
        this.title = this.title || this.translateService.instant('component.toast.title.info');
        this.bgColor = 'tw-bg-blue-400';
        break;
    }
  }

  ngAfterViewInit(): void {
    setTimeout((): void => {
      this.containerWith = this.container.nativeElement.clientWidth;
      this.changeDetectorRef.detectChanges();
    });
  }

}
