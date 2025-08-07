import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../state/auth.service';
import { DashboardMiddlewareService } from '../../services/dashboard-middleware.service';
import { NavigationItem } from '../../config/dashboard-navigation.config';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-inner-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, DashboardHeaderComponent],
  templateUrl: './quiz-layout.component.html',
  styleUrls: ['./quiz-layout.component.scss'],
})
export class QuizLayoutComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private dashboardMiddleware: DashboardMiddlewareService,
    private router: Router
  ) {}

  ngOnInit() {
    // Set middleware state
    this.dashboardMiddleware.setCurrentSection('dashboard');
    this.dashboardMiddleware.setLoading(true);
    this.dashboardMiddleware.logActivity('Dashboard area accessed');

    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;

      if (user) {
        // Set basic student permissions
        const studentPermissions = [
          'read',
          'write',
          'view_courses',
          'view_progress',
          'view_certificates',
        ];
        this.dashboardMiddleware.setUserPermissions(studentPermissions);
        this.dashboardMiddleware.logActivity('User data loaded', {
          userId: user.id,
          name: user.name,
        });
      }

      this.dashboardMiddleware.setLoading(false);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.dashboardMiddleware.logActivity('Dashboard area left');
  }

  // Navigation event handlers
  onNavigationItemClick(item: NavigationItem): void {
    this.dashboardMiddleware.logActivity('Navigation item clicked', {
      itemId: item.id,
      route: item.route,
      label: item.label,
    });
  }

  onNavigationLogout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
