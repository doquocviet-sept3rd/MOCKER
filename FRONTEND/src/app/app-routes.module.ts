import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AUTH } from './component/auth/auth.constant';
import { HOME } from './component/home/home.constant';

export const routes: Routes = [
  {
    path: AUTH,
    loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: HOME,
    loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
