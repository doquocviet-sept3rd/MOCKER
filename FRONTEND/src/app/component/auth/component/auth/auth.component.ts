import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH, SIGN_IN, SIGN_UP } from '../../auth.constant';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from '../../../../shared/service/auth.service';
import { DomUtil } from '../../../../shared/util/dom.util';
import { EqualValidator } from '../../../../shared/validator/equal.validator';
import { AppConfig } from '../../../../app.config';
import { HOME } from '../../../home/home.constant';

interface AuthFormGroup {
  username: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  signInProgress: boolean = false;
  authFormGroup: FormGroup<AuthFormGroup>;
  confirmPassword: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder,
    private authService: AuthService,
    private appConfig: AppConfig
  ) {
    this.signInProgress = this.activatedRoute.routeConfig?.path === SIGN_IN;
    this.authFormGroup = formBuilder.group<AuthFormGroup>({
      username: formBuilder.control(undefined, [Validators.required, Validators.email]),
      password: formBuilder.control(undefined, [Validators.required])
    });
    this.confirmPassword = formBuilder.control(undefined, [Validators.required, EqualValidator(this.authFormGroup.controls.password)]);
  }

  signIn(): void {
    this.router.navigate([`${AUTH}/${SIGN_IN}`]).then();
  }

  signUp(): void {
    this.router.navigate([`${AUTH}/${SIGN_UP}`]).then();
  }

  submit(): void {
    if (this.authFormGroup.invalid) {
      DomUtil.scrollToFirstInvalidControl(this.authFormGroup);
      return;
    }
    const { username, password } = this.authFormGroup.value;
    if (this.signInProgress) {
      this.authService.signIn(username, password)
        .subscribe((authResponse: AuthResponse): void => {
          this.appConfig.token = authResponse.token;
          sessionStorage.setItem('auth.token', authResponse.token);
          this.router.navigate([`/${HOME}`]).then();
        });
    } else {
      this.authService.signUp(username, password)
        .subscribe((authResponse: AuthResponse): void => {
          sessionStorage.setItem('auth.token', authResponse.token);
          this.appConfig.token = authResponse.token;
          this.router.navigate([`/${HOME}`]).then();
        });
    }
  }

  loginByGoogle(): void {

  }

  loginByGitHub(): void {

  }

  loginByFacebook(): void {

  }

}
