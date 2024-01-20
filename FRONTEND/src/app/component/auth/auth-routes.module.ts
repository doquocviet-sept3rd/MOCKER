import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { FORGOT, SIGN_IN, SIGN_UP } from './auth.constant';
import { ForgotComponent } from './component/forgot/forgot.component';

const routes: Routes = [
  { path: '', redirectTo: `/auth/${SIGN_IN}`, pathMatch: 'full' },
  {
    path: '', children: [
      { path: SIGN_IN, component: AuthComponent },
      { path: SIGN_UP, component: AuthComponent },
      { path: FORGOT, component: ForgotComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutesModule {
}
