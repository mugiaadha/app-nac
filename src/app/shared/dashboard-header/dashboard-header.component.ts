import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../state/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [LogoComponent, AsyncPipe, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div class="container-fluid">
        <a
          class="navbar-brand d-flex align-items-center gap-2"
          [routerLink]="['/']"
        >
          <app-logo></app-logo>
        </a>

        <!-- User Menu -->
        <div class="d-flex gap-2">
          <div *ngIf="auth.isLoggedIn$ | async" class="dropdown">
            <button
              class="btn btn-default dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              [disabled]="isLoggingOut"
            >
              {{ (auth.user$ | async)?.name || 'User' }}
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <a class="dropdown-item" [routerLink]="['/dashboard']">
                  <i class="bi bi-speedometer2 me-2"></i>Dashboard
                </a>
              </li>
              <li>
                <a class="dropdown-item" [routerLink]="['/profile']">
                  <i class="bi bi-person me-2"></i>Profile
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  href="/logout"
                  class="dropdown-item"
                  (click)="logout(); $event.preventDefault()"
                >
                  <i class="bi bi-box-arrow-right me-2"></i>
                  {{ isLoggingOut ? 'Loading...' : 'Logout' }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        border-bottom: 1px solid var(--bs-border-color-translucent);
      }

      .breadcrumb-item.active {
        color: var(--bs-primary);
      }

      .breadcrumb-item + .breadcrumb-item::before {
        color: var(--bs-secondary);
      }
    `,
  ],
})
export class DashboardHeaderComponent {
  isLoggingOut = false;

  constructor(
    public auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  logout() {
    if (this.isLoggingOut) return;

    this.showLogoutLoading();
    this.performLogout();
  }

  private showLogoutLoading() {
    this.isLoggingOut = true;
    this.toastr.info('Mengakhiri sesi Anda...', 'Tunggu Sebentar', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: false,
      tapToDismiss: false,
    });
  }

  private performLogout() {
    this.auth.logout().subscribe({
      next: (success) => {
        this.handleLogoutResponse(success);
      },
      error: (error) => {
        this.handleLogoutError(error);
      },
    });
  }

  private handleLogoutResponse(success: boolean) {
    this.isLoggingOut = false;
    this.toastr.clear();

    if (success) {
      this.toastr.success('Sampai jumpa lagi!', 'Logout Berhasil');
      this.router.navigate(['/login']);
    }
  }

  private handleLogoutError(error: any) {
    this.isLoggingOut = false;
    this.toastr.clear();
    this.toastr.error('Gagal logout, coba lagi', 'Terjadi Kesalahan');
    console.error('Logout error:', error);
  }
}
