import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideActivity,
  lucideBell,
  lucideCalendarDays,
  lucideChevronRight,
  lucideGitCompare,
  lucideHeartPulse,
  lucideRuler,
  lucideUpload,
  lucideWaves,
  lucideX,
} from '@ng-icons/lucide';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { notificationInterceptor } from './core/notifications/notification.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([notificationInterceptor])),
    provideRouter(routes),
    provideIcons({
      lucideActivity,
      lucideBell,
      lucideCalendarDays,
      lucideChevronRight,
      lucideGitCompare,
      lucideHeartPulse,
      lucideRuler,
      lucideUpload,
      lucideWaves,
      lucideX,
    }),
  ],
};
