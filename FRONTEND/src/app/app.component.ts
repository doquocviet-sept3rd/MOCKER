import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translateService: TranslateService
  ) {
    const language: string = 'en';
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }
}
