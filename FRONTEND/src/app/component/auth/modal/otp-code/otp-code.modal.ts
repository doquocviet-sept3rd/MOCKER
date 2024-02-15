import { AbstractModal } from '../../../../shared/common/abstract.modal';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomUtil } from '../../../../shared/util/dom.util';
import { FormUtil } from '../../../../shared/util/form.util';
import { NumberValidator } from '../../../../shared/validator/number.validator';
import { AuthRequest, AuthResponse, AuthService } from '../../../../shared/service/auth.service';
import { OtpService } from '../../../../shared/service/otp.service';
import { ModalProvider } from '../../../../shared/modal/modal.provider';
import { HttpErrorResponse } from '@angular/common/http';
import { CodeEnum } from '../../../../shared/service/service.constant';
import { OTP_CODE_INVALID } from '../../../../shared/validator/validator.constant';

export interface OtpCodeModalOptions {
  username: string;
  password: string;
}

@Component({
  selector: 'app-otp-code-modal',
  templateUrl: 'otp-code.modal.html',
  styleUrls: ['otp-code.modal.scss']
})
export class OtpCodeModal extends AbstractModal implements OnInit {
  options: OtpCodeModalOptions;
  protected readonly FormUtil = FormUtil;
  @ViewChild('code') otpCodeElementRef: ElementRef<HTMLInputElement>;
  otpCode: FormControl<any>;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private otpService: OtpService,
    private modalProvider: ModalProvider
  ) {
    super();
    this.otpCode = formBuilder.control(undefined, [
      Validators.required,
      NumberValidator(),
      Validators.minLength(6),
      Validators.maxLength(6)]);
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.otpCode.markAsTouched();
    if (this.otpCode.invalid) {
      DomUtil.scrollTo(this.otpCodeElementRef.nativeElement);
      return;
    }
    const authRequest: AuthRequest = {
      ...this.options
    };
    authRequest.otpCode = this.otpCode.value;
    this.authService.signUp(authRequest)
      .subscribe({
        next: (authResponse: AuthResponse): void => {
          this.close(authResponse.token);
        },
        error: (httpErrorResponse: HttpErrorResponse): void => {
          if (httpErrorResponse.error.code === CodeEnum.BAD_REQUEST) {
            this.otpCode.setErrors({
              [OTP_CODE_INVALID]: httpErrorResponse.error.message
            });
          }
        }
      });
  }

  resend(): void {
    this.otpCode.patchValue(undefined);
    this.otpCode.setErrors(null);
    this.otpService.register(this.options.username).subscribe((): void => {
      this.modalProvider.inform({
        description: 'modal.otp_code.resent_successful'
      });
    });
  }

}
