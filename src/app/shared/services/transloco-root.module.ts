import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode, NgModule } from '@angular/core';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TRANSLOCO_TRANSPILER,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_INTERCEPTOR,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService,
  DefaultTranspiler,
  TranslocoMissingHandler
} from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`assets/i18n/${lang}.json`);
  }
}

@Injectable({ providedIn: 'root' })
export class CustomMissingHandler implements TranslocoMissingHandler {
  handle(key: string, config: any): string {
    if (!config.prodMode) {
      const msg = `Missing translation for '${key}'`;
      console.warn(`%c ${msg}`, 'font-size: 12px; color: red');
    }
    return key;
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['ar', 'en'],
        defaultLang: 'ar',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        fallbackLang: 'ar'
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler },
    { provide: TRANSLOCO_MISSING_HANDLER, useClass: CustomMissingHandler },
    { provide: TRANSLOCO_INTERCEPTOR, useValue: [] }
  ]
})
export class TranslocoRootModule {} 