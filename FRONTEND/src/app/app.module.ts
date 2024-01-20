import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { TRANSLATE } from './app.translate';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AppRoutesModule,
    BrowserModule,
    TRANSLATE
  ]
})
export class AppModule {
}
