import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { HomeRoutesModule } from './home-routes.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [HomeRoutesModule]
})
export class HomeModule {
}
