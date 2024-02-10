import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModuleWithProviders } from '@angular/core';

export const TRANSLATE: ModuleWithProviders<TranslateModule> = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
});

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function translateFactory(translate: TranslateService) {
  return async (): Promise<any> => {
    translate.setDefaultLang('en-US');
    translate.use('en-US');
    return new Promise((resolve): void => {
      translate.onLangChange.subscribe((): void => {
        resolve(undefined);
      });
    });
  };
}
