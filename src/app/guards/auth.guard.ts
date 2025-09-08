import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../state/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        const statusPageMap: Record<string, string> = {
          'email-verif': '/verifikasi-email',
          'payment-verif': '/verifikasi-payment',
        };
        const allowedPage = statusPageMap[user.status];
        const isOnAllowedPage =
          allowedPage && state.url.startsWith(allowedPage);

        // If user has a restricted status
        if (allowedPage) {
          if (isOnAllowedPage) return true;
          setTimeout(() => router.navigate([allowedPage]), 0);
          return false;
        }

        // If user is active, block access to any restricted page
        if (
          Object.values(statusPageMap).some((page) =>
            state.url.startsWith(page),
          )
        ) {
          setTimeout(() => router.navigate(['/dashboard']), 0);
          return false;
        }
        return true;
      } else {
        // Simpan intended URL untuk redirect setelah login
        localStorage.setItem('intendedUrl', state.url);
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
