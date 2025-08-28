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
        if (user.status === 'email-verif') {
          // Only allow access to /verifikasi-email
          if (state.url.startsWith('/verifikasi-email')) {
            return true;
          } else {
            router.navigate(['/verifikasi-email']);
            return false;
          }
        }
        if (user.status === 'payment-verif') {
          // Only allow access to /payment
          if (state.url.startsWith('/payment')) {
            return true;
          } else {
            router.navigate(['/payment']);
            return false;
          }
        }
        return true;
      } else {
        // Simpan intended URL untuk redirect setelah login
        localStorage.setItem('intendedUrl', state.url);
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
