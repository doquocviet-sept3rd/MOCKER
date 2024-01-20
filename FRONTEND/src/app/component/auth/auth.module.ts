import { NgModule } from '@angular/core';
import { AuthComponent } from './component/auth/auth.component';
import { AuthRoutesModule } from './auth-routes.module';
import { ForgotComponent } from './component/forgot/forgot.component';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotComponent
  ],
  imports: [AuthRoutesModule]
})
export class AuthModule {
}
