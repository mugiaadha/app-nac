# Navigation System Documentation

## Overview

The navigation system is built with reusable components and centralized configuration to provide consistent navigation across web and mobile platforms.

## Components Structure

### 1. Navigation Configuration (`dashboard-navigation.config.ts`)

Centralized configuration for all navigation items with support for:

- Different display contexts (sidebar, mobile, dropdown)
- Authentication requirements
- Custom styling
- Item types (link, button, divider)

### 2. Navigation Service (`navigation.service.ts`)

Service for managing navigation state and providing configuration data:

- Mobile dropdown state management
- Navigation filtering by type and permissions
- Route tracking

### 3. Navigation Component (`navigation.component.ts`)

Reusable component that renders navigation based on type:

- `type="sidebar"` - Desktop sidebar navigation
- `type="mobile"` - Mobile bottom navigation
- `type="dropdown"` - Dropdown menu for mobile "More" button

### 4. Quick Stats Component (`quick-stats.component.ts`)

Configurable stats display component for dashboard sidebar.

## Usage Examples

### Basic Sidebar Navigation

```html
<app-navigation type="sidebar" [showTitle]="true" title="Navigation" titleIcon="bi-grid-3x3-gap" (onNavigate)="onNavigationItemClick($event)" (onLogout)="onNavigationLogout()"></app-navigation>
```

### Mobile Bottom Navigation

```html
<app-navigation type="mobile" [showTitle]="false" (onNavigate)="onNavigationItemClick($event)" (onLogout)="onNavigationLogout()"></app-navigation>
```

### Quick Stats Display

```html
<app-quick-stats></app-quick-stats>
```

## Configuration

### Adding New Navigation Items

Edit `dashboard-navigation.config.ts`:

```typescript
{
  id: 'new-page',
  label: 'New Page',
  icon: 'bi-star',
  route: '/new-page',
  type: 'link',
  description: 'Description of new page',
  showInSidebar: true,
  showInMobile: true,
  showInDropdown: false,
  requiresAuth: true
}
```

### Adding Quick Stats

Edit `dashboard-navigation.config.ts`:

```typescript
{
  id: 'new-stat',
  label: 'New Metric',
  value: 85,
  color: 'bg-success',
  type: 'progress',
  description: 'Description of metric'
}
```

## Navigation Item Properties

| Property         | Type                                          | Description             |
| ---------------- | --------------------------------------------- | ----------------------- |
| `id`             | string                                        | Unique identifier       |
| `label`          | string                                        | Display text            |
| `icon`           | string                                        | Bootstrap icon class    |
| `route`          | string                                        | Route path              |
| `type`           | 'link' \| 'dropdown' \| 'divider' \| 'button' | Item type               |
| `showInSidebar`  | boolean                                       | Show in desktop sidebar |
| `showInMobile`   | boolean                                       | Show in mobile nav      |
| `showInDropdown` | boolean                                       | Show in dropdown menu   |
| `requiresAuth`   | boolean                                       | Requires authentication |
| `cssClass`       | string                                        | Additional CSS classes  |
| `description`    | string                                        | Tooltip or description  |

## Mobile Navigation Features

- **Sticky Bottom Navigation**: Always visible at bottom of screen
- **Dropdown Menu**: "More" button with additional options
- **Backdrop**: Semi-transparent overlay when dropdown is open
- **Responsive Design**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for touch interactions

## Integration with InnerLayoutComponent

The navigation components are integrated into `InnerLayoutComponent`:

```typescript
// Navigation event handlers
onNavigationItemClick(item: NavigationItem): void {
  // Handle navigation clicks
}

onNavigationLogout(): void {
  // Handle logout
}
```

## Benefits

1. **Centralized Configuration**: All navigation items in one place
2. **Reusable Components**: Same component works for different contexts
3. **Synchronized Data**: Mobile and web navigation stay in sync
4. **Type Safety**: TypeScript interfaces for all configuration
5. **Responsive Design**: Automatic adaptation to screen sizes
6. **Extensible**: Easy to add new navigation items or modify existing ones

## Future Enhancements

- Permission-based navigation filtering
- Dynamic navigation items from backend
- Navigation analytics tracking
- Custom animation configurations
- Theme-based styling options
