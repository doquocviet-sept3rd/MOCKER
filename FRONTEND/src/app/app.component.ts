import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    protected appConfig: AppConfig
  ) {
    const language: string = 'en';
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }
}
