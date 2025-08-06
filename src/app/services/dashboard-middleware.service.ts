import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DashboardState {
  isLoading: boolean;
  currentSection: string;
  breadcrumbs: string[];
  userPermissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardMiddlewareService {
  private stateSubject = new BehaviorSubject<DashboardState>({
    isLoading: false,
    currentSection: 'dashboard',
    breadcrumbs: ['Dashboard'],
    userPermissions: [],
  });

  public state$ = this.stateSubject.asObservable();

  constructor() {}

  // Middleware untuk set loading state
  setLoading(loading: boolean): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      isLoading: loading,
    });
  }

  // Middleware untuk set current section
  setCurrentSection(section: string): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      currentSection: section,
      breadcrumbs: this.generateBreadcrumbs(section),
    });
  }

  // Middleware untuk set user permissions
  setUserPermissions(permissions: string[]): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      userPermissions: permissions,
    });
  }

  // Generate breadcrumbs based on section
  private generateBreadcrumbs(section: string): string[] {
    const breadcrumbMap: { [key: string]: string[] } = {
      dashboard: ['Dashboard'],
      profile: ['Dashboard', 'Profile'],
      settings: ['Dashboard', 'Settings'],
      admin: ['Dashboard', 'Admin Panel'],
      courses: ['Dashboard', 'My Courses'],
      certificates: ['Dashboard', 'Certificates'],
      progress: ['Dashboard', 'Progress'],
      schedule: ['Dashboard', 'Schedule'],
    };

    return breadcrumbMap[section] || ['Dashboard'];
  }

  // Check if user has permission
  hasPermission(permission: string): Observable<boolean> {
    return new Observable((observer) => {
      this.state$.subscribe((state) => {
        observer.next(state.userPermissions.includes(permission));
      });
    });
  }

  // Log dashboard activity
  logActivity(action: string, data?: any): void {
    console.log(`[Dashboard Middleware] ${action}:`, {
      timestamp: new Date().toISOString(),
      section: this.stateSubject.value.currentSection,
      data: data,
    });
  }
}
