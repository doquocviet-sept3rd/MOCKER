import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { TRANSLATE, translateFactory } from './app.translate';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AbstractService } from './shared/service/abstract.service';
import { SharedModule } from './shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AppRoutesModule,
    BrowserModule,
    HttpClientModule,
    TRANSLATE,
    SharedModule
  ],
  providers: [{
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: AbstractService
  }, {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: translateFactory,
    deps: [TranslateService]
  }]
})
export class AppModule {
}
