export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  type: 'link' | 'dropdown' | 'divider' | 'button';
  children?: NavigationItem[];
  description?: string;
  showInSidebar?: boolean;
  showInMobile?: boolean;
  showInDropdown?: boolean;
  cssClass?: string;
  requiresAuth?: boolean;
  permission?: string;
}

export const DASHBOARD_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'bi-house',
    route: '/dashboard',
    type: 'link',
    description: 'Overview dan statistik pembelajaran',
    showInSidebar: true,
    showInMobile: true,
    showInDropdown: false,
    requiresAuth: true,
  },
  {
    id: 'brevet-pajak',
    label: 'Brevet Pajak',
    icon: 'bi-file-earmark-text',
    route: '/brevet-pajak',
    type: 'link',
    description: 'Program Brevet Pajak A, B, C',
    showInSidebar: true,
    showInMobile: true,
    showInDropdown: false,
    requiresAuth: true,
  },
  {
    id: 'my-courses',
    label: 'My Courses',
    icon: 'bi-book',
    route: '/my-courses',
    type: 'link',
    description: 'Kursus yang sedang diikuti',
    showInSidebar: true,
    showInMobile: true,
    showInDropdown: false,
    requiresAuth: true,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: 'bi-award',
    route: '/certificates',
    type: 'link',
    description: 'Sertifikat yang telah diperoleh',
    showInSidebar: true,
    showInMobile: true,
    showInDropdown: false,
    requiresAuth: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'bi-person',
    route: '/profile',
    type: 'link',
    description: 'Pengaturan profil pengguna',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    requiresAuth: true,
  },
  {
    id: 'divider-1',
    label: '',
    icon: '',
    route: '',
    type: 'divider',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
  },
  {
    id: 'browse-courses',
    label: 'Browse Courses',
    icon: 'bi-collection',
    route: '/courses',
    type: 'link',
    description: 'Jelajahi semua kursus tersedia',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    requiresAuth: false,
  },
  {
    id: 'articles',
    label: 'Articles',
    icon: 'bi-newspaper',
    route: '/articles',
    type: 'link',
    description: 'Baca artikel terbaru',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    requiresAuth: false,
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'bi-briefcase',
    route: '/services',
    type: 'link',
    description: 'Layanan konsultasi dan compliance',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    requiresAuth: false,
  },
  {
    id: 'help-center',
    label: 'Help Center',
    icon: 'bi-question-circle',
    route: '/pusat-bantuan',
    type: 'link',
    description: 'Bantuan dan dukungan',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    requiresAuth: false,
  },
  {
    id: 'divider-2',
    label: '',
    icon: '',
    route: '',
    type: 'divider',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: 'bi-box-arrow-right',
    route: '',
    type: 'button',
    description: 'Keluar dari aplikasi',
    showInSidebar: false,
    showInMobile: false,
    showInDropdown: true,
    cssClass: 'text-danger',
    requiresAuth: true,
  },
];

// Quick stats configuration
export interface QuickStatItem {
  id: string;
  label: string;
  value: string | number;
  icon?: string;
  color: string;
  type: 'progress' | 'text' | 'badge';
  description?: string;
}

export const DASHBOARD_QUICK_STATS: QuickStatItem[] = [
  {
    id: 'course-progress',
    label: 'Course Progress',
    value: 75,
    color: 'bg-malibu-beach',
    type: 'progress',
    description: 'Progress keseluruhan kursus',
  },
  {
    id: 'monthly-goal',
    label: 'Monthly Goal',
    value: 60,
    color: 'bg-grow-early',
    type: 'progress',
    description: 'Target bulanan pembelajaran',
  },
  {
    id: 'streak',
    label: 'Streak',
    value: '🔥 7 days',
    color: 'text-warning',
    type: 'text',
    description: 'Streak belajar harian',
  },
];
