import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../state/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user => {
      if (user) {
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
