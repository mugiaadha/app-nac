import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../state/auth.service';
import { NavigationItem } from '../../config/dashboard-navigation.config';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() type: 'sidebar' | 'mobile' | 'dropdown' = 'sidebar';
  @Input() showTitle: boolean = true;
  @Input() title: string = 'Navigation';
  @Input() titleIcon: string = 'bi-grid-3x3-gap';
  @Output() onNavigate = new EventEmitter<NavigationItem>();
  @Output() onLogout = new EventEmitter<void>();

  navigationItems: NavigationItem[] = [];
  currentRoute: string = '';
  showMobileDropdown: boolean = false;
  isAuthenticated: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load navigation items based on type
    this.loadNavigationItems();

    // Subscribe to mobile dropdown state
    this.navigationService.getMobileDropdownState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.showMobileDropdown = state;
      });

    // Subscribe to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.navigationService.setCurrentRoute(event.url);
      });

    // Subscribe to auth state
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        this.loadNavigationItems(); // Reload items when auth state changes
      });

    // Set initial route
    this.currentRoute = this.router.url;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNavigationItems() {
    let items = this.navigationService.getNavigationByType(this.type);
    
    // Filter by authentication
    items = this.navigationService.filterByAuth(items, this.isAuthenticated);
    
    this.navigationItems = items;
  }

  onItemClick(item: NavigationItem, event?: Event) {
    if (item.type === 'button') {
      event?.preventDefault();
      this.handleButtonClick(item);
    } else if (item.type === 'link') {
      this.handleLinkClick(item);
    }

    // Close mobile dropdown if open
    if (this.type === 'dropdown' || this.type === 'mobile') {
      this.navigationService.closeMobileDropdown();
    }

    this.onNavigate.emit(item);
  }

  private handleButtonClick(item: NavigationItem) {
    switch (item.id) {
      case 'logout':
        this.logout();
        break;
      default:
        console.log('Button clicked:', item.id);
    }
  }

  private handleLinkClick(item: NavigationItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  toggleMobileDropdown() {
    this.navigationService.toggleMobileDropdown();
  }

  closeMobileDropdown() {
    this.navigationService.closeMobileDropdown();
  }

  logout() {
    this.authService.logout();
    this.onLogout.emit();
  }

  isActive(route: string): boolean {
    if (route === '/dashboard') {
      return this.currentRoute === route;
    }
    return this.currentRoute.startsWith(route);
  }

  getItemClasses(item: NavigationItem): string {
    let classes = '';
    
    switch (this.type) {
      case 'sidebar':
        classes = 'sidebar-item';
        if (this.isActive(item.route)) {
          classes += ' active';
        }
        break;
      case 'mobile':
        classes = 'mobile-nav-item';
        if (this.isActive(item.route)) {
          classes += ' active';
        }
        break;
      case 'dropdown':
        if (item.type === 'divider') {
          classes = 'mobile-dropdown-divider';
        } else if (item.type === 'button') {
          classes = 'mobile-dropdown-item logout-btn';
        } else {
          classes = 'mobile-dropdown-item';
        }
        break;
    }

    if (item.cssClass) {
      classes += ` ${item.cssClass}`;
    }

    return classes;
  }

  getIconClasses(item: NavigationItem): string {
    let classes = item.icon;
    if (item.cssClass && item.type === 'button') {
      classes += ` ${item.cssClass}`;
    }
    return classes;
  }

  getTextClasses(item: NavigationItem): string {
    if (item.cssClass && item.type === 'button') {
      return item.cssClass;
    }
    return '';
  }

  getDropdownNavigation(): NavigationItem[] {
    return this.navigationService.getDropdownNavigation();
  }
}
