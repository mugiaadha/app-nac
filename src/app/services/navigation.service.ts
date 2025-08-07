import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationItem, DASHBOARD_NAVIGATION, QuickStatItem, DASHBOARD_QUICK_STATS } from '../config/dashboard-navigation.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private mobileDropdownState$ = new BehaviorSubject<boolean>(false);
  private currentRoute$ = new BehaviorSubject<string>('');

  constructor() {}

  // Navigation items getters
  getSidebarNavigation(): NavigationItem[] {
    return DASHBOARD_NAVIGATION.filter(item => item.showInSidebar);
  }

  getMobileNavigation(): NavigationItem[] {
    return DASHBOARD_NAVIGATION.filter(item => item.showInMobile);
  }

  getDropdownNavigation(): NavigationItem[] {
    return DASHBOARD_NAVIGATION.filter(item => item.showInDropdown);
  }

  getAllNavigation(): NavigationItem[] {
    return DASHBOARD_NAVIGATION;
  }

  getQuickStats(): QuickStatItem[] {
    return DASHBOARD_QUICK_STATS;
  }

  // Mobile dropdown state management
  getMobileDropdownState(): Observable<boolean> {
    return this.mobileDropdownState$.asObservable();
  }

  toggleMobileDropdown(): void {
    this.mobileDropdownState$.next(!this.mobileDropdownState$.value);
  }

  closeMobileDropdown(): void {
    this.mobileDropdownState$.next(false);
  }

  showMobileDropdown(): void {
    this.mobileDropdownState$.next(true);
  }

  isMobileDropdownOpen(): boolean {
    return this.mobileDropdownState$.value;
  }

  // Current route management
  setCurrentRoute(route: string): void {
    this.currentRoute$.next(route);
  }

  getCurrentRoute(): Observable<string> {
    return this.currentRoute$.asObservable();
  }

  // Navigation helpers
  getNavigationByType(type: 'sidebar' | 'mobile' | 'dropdown'): NavigationItem[] {
    switch (type) {
      case 'sidebar':
        return this.getSidebarNavigation();
      case 'mobile':
        return this.getMobileNavigation();
      case 'dropdown':
        return this.getDropdownNavigation();
      default:
        return [];
    }
  }

  getNavigationById(id: string): NavigationItem | undefined {
    return DASHBOARD_NAVIGATION.find(item => item.id === id);
  }

  // Filter navigation by permission (for future use)
  filterByPermission(items: NavigationItem[], userPermissions: string[] = []): NavigationItem[] {
    return items.filter(item => {
      if (!item.permission) return true;
      return userPermissions.includes(item.permission);
    });
  }

  // Filter navigation by auth requirement
  filterByAuth(items: NavigationItem[], isAuthenticated: boolean): NavigationItem[] {
    return items.filter(item => {
      if (item.requiresAuth === undefined) return true;
      return item.requiresAuth === isAuthenticated;
    });
  }
}
