import { NgModule } from '@angular/core';
import { AuthComponent } from './component/auth/auth.component';
import { AuthRoutesModule } from './auth-routes.module';
import { ForgotComponent } from './component/forgot/forgot.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotComponent
  ],
    imports: [AuthRoutesModule, TranslateModule, NgOptimizedImage, CurrencyPipe, TitleCasePipe, NgIf, ReactiveFormsModule, SharedModule]
})
export class AuthModule {
}
