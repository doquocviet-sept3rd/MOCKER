import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH, SIGN_IN, SIGN_UP } from '../../auth.constant';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from '../../../../shared/service/auth.service';
import { DomUtil } from '../../../../shared/util/dom.util';
import { EqualValidator } from '../../../../shared/validator/equal.validator';
import { AppConfig } from '../../../../app.config';
import { HOME } from '../../../home/home.constant';
import { AbstractComponent } from '../../../../shared/common/abstract.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CodeEnum } from '../../../../shared/service/service.constant';
import {
  USERNAME_ALREADY_REGISTERED,
  USERNAME_OR_PASSWORD_ARE_INCORRECT
} from '../../../../shared/common/error.constant';
import { TranslateService } from '@ngx-translate/core';
import { ModalProvider } from '../../../../shared/modal/modal.provider';

interface AuthFormGroup {
  username: FormControl<any>;
  password: FormControl<any>;
}

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent extends AbstractComponent {
  signInProgress: boolean = false;
  authFormGroup: FormGroup<AuthFormGroup>;
  confirmPassword: FormControl<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder,
    private authService: AuthService,
    private appConfig: AppConfig,
    private toastService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private modalProvider: ModalProvider
  ) {
    super();
    this.signInProgress = this.activatedRoute.routeConfig?.path === SIGN_IN;
    this.authFormGroup = formBuilder.group<AuthFormGroup>({
      username: formBuilder.control(undefined, [Validators.required, Validators.email]),
      password: formBuilder.control(undefined, [Validators.required])
    });
    this.authFormGroup.controls.username.valueChanges.subscribe((): void => {
      let errors: ValidationErrors | null = this.authFormGroup.controls.username.errors;
      if (!errors) {
        return;
      }
      delete errors[USERNAME_ALREADY_REGISTERED];
      delete errors[USERNAME_OR_PASSWORD_ARE_INCORRECT];
      if (!Object.keys(errors)?.length) {
        errors = null;
      }
      this.authFormGroup.controls.username.setErrors(errors);
      this.changeDetectorRef.detectChanges();
    });
    this.authFormGroup.controls.password.valueChanges.subscribe((): void => {
      let errors: ValidationErrors | null = this.authFormGroup.controls.username.errors;
      if (!errors) {
        return;
      }
      delete errors[USERNAME_OR_PASSWORD_ARE_INCORRECT];
      if (!Object.keys(errors)?.length) {
        errors = null;
      }
      this.authFormGroup.controls.username.setErrors(errors);
      this.changeDetectorRef.detectChanges();
    });
    this.confirmPassword = formBuilder.control(undefined, [
      Validators.required,
      EqualValidator(this.authFormGroup.controls.password, this.translateService.instant('component.sign_up.password_is_not_equal'))
    ]);
  }

  signIn(): void {
    this.router.navigate([`${AUTH}/${SIGN_IN}`]).then();
  }

  signUp(): void {
    this.router.navigate([`${AUTH}/${SIGN_UP}`]).then();
  }

  submit(): void {
    this.authFormGroup.markAsTouched();
    if (this.authFormGroup.invalid) {
      DomUtil.scrollToFirstInvalidControl(this.authFormGroup);
      return;
    }
    const { username, password } = this.authFormGroup.value;
    if (this.signInProgress) {
      this.authService.signIn(username, password)
        .subscribe({
          next: (authResponse: AuthResponse): void => {
            this.appConfig.token = authResponse.token;
            sessionStorage.setItem('auth.token', authResponse.token);
            this.router.navigate([`/${HOME}`])
              .then((): void => {
                this.toastService.success('Login successfully');
              });
          },
          error: (httpErrorResponse: HttpErrorResponse): void => {
            if (httpErrorResponse.error.code === CodeEnum.BAD_REQUEST) {
              this.authFormGroup.controls.username.setErrors({
                ...this.authFormGroup.controls.username.errors,
                [USERNAME_OR_PASSWORD_ARE_INCORRECT]: httpErrorResponse.error.message
              });
            } else {
              throw new Error(httpErrorResponse.error.message);
            }
          }
        });
    } else {
      this.authService.signUp(username, password)
        .subscribe({
          next: (authResponse: AuthResponse): void => {
            sessionStorage.setItem('auth.token', authResponse.token);
            this.appConfig.token = authResponse.token;
            this.router.navigate([`/${HOME}`]).then();
          },
          error: (httpErrorResponse: HttpErrorResponse): void => {
            if (httpErrorResponse.error.code === CodeEnum.BAD_REQUEST) {
              this.authFormGroup.controls.username.setErrors({
                ...this.authFormGroup.controls.username.errors,
                [USERNAME_ALREADY_REGISTERED]: httpErrorResponse.error.message
              });
            } else {
              // @ts-ignore
              throw new Error(httpErrorResponse);
            }
          }
        });
    }
  }

  loginByGoogle(): void {
    this.modalProvider.inform({
      description: 'This feature currently is disabled, please use email and password instead'
    });
  }

  loginByGitHub(): void {
    this.modalProvider.inform({
      description: 'This feature currently is disabled, please use email and password instead'
    });
  }

  loginByFacebook(): void {
    this.modalProvider.inform({
      description: 'This feature currently is disabled, please use email and password instead'
    });
  }

}
