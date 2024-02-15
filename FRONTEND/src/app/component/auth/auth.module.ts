import { NgModule } from '@angular/core';
import { AuthComponent } from './component/auth/auth.component';
import { AuthRoutesModule } from './auth-routes.module';
import { ForgotComponent } from './component/forgot/forgot.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OtpCodeModal } from './modal/otp-code/otp-code.modal';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotComponent,
    OtpCodeModal
  ],
  imports: [AuthRoutesModule, TranslateModule, NgOptimizedImage, CurrencyPipe, TitleCasePipe, NgIf, ReactiveFormsModule, SharedModule]
})
export class AuthModule {
}
