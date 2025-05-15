// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

// NG-ZORRO modules
import { NzLayoutModule }   from 'ng-zorro-antd/layout';
import { NzMenuModule }     from 'ng-zorro-antd/menu';
import { NzAvatarModule }   from 'ng-zorro-antd/avatar';
import { NzBadgeModule }    from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule }     from 'ng-zorro-antd/icon';
import { NzButtonModule }   from 'ng-zorro-antd/button';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(en_US),

    // aquí importas los módulos de NG-ZORRO
    importProvidersFrom(
      FormsModule,
      NzLayoutModule,
      NzMenuModule,
      NzAvatarModule,
      NzBadgeModule,
      NzDropDownModule,
      NzIconModule,
      NzButtonModule
    ),

    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
