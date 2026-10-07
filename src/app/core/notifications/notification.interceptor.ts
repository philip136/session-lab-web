import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from './notification.service';

export const notificationInterceptor: HttpInterceptorFn = (request, next) => {
  const notifications = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      notifications.error(errorMessage(error));
      return throwError(() => error);
    }),
  );
};

function errorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) return 'The API is unavailable. Check that the backend is running.';
  if (error.status === 404) return 'The requested workout data could not be found.';
  if (error.status >= 500) return 'The backend failed while processing the request.';
  return 'The request could not be completed.';
}
