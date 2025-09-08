import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class DashboardInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Cek apakah request adalah untuk dashboard
    if (req.url.includes('/dashboard') || req.url.includes('/api/user')) {
      console.log('Dashboard middleware - Request:', req.url);

      // Clone request dan tambah headers
      const dashboardReq = req.clone({
        setHeaders: {
          'X-Dashboard-Request': 'true',
          'X-Request-Time': new Date().toISOString(),
        },
      });

      return next.handle(dashboardReq).pipe(
        tap((event) => {
          console.log('Dashboard middleware - Response:', event);
        }),
        catchError((error) => {
          console.error('Dashboard middleware - Error:', error);
          // Handle dashboard specific errors
          if (error.status === 401) {
            // Redirect to login
            window.location.href = '/login';
          }
          return throwError(() => error);
        }),
      );
    }

    return next.handle(req);
  }
}
