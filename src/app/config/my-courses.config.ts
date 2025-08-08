// ========================================
// MY COURSES CONFIGURATION
// ========================================

export interface CourseData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  category: string;
  image: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  completedLessons: number;
  totalLessons: number;
  enrolledDate: Date;
  lastAccessed?: Date;
  rating?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface CourseFilter {
  key: 'all' | 'in-progress' | 'completed' | 'not-started';
  label: string;
  icon: string;
  color: string;
}

export interface CourseAction {
  key: string;
  label: string;
  icon: string;
  color: string;
  action: string;
}

// Course Status Configuration
export const COURSE_STATUS_CONFIG = {
  'not-started': {
    badge: 'bg-midnight-bloom',
    text: 'Not Started',
    color: '#6c757d',
    progressColor: 'bg-midnight-bloom',
  },
  'in-progress': {
    badge: 'bg-malibu-purple',
    text: 'In Progress',
    color: '#f39c12',
    progressColor: 'bg-malibu-purple',
  },
  completed: {
    badge: 'bg-grow-early',
    text: 'Completed',
    color: '#27ae60',
    progressColor: 'bg-grow-early',
  },
} as const;

// Filter Configuration
export const COURSE_FILTERS: CourseFilter[] = [
  {
    key: 'all',
    label: 'All Courses',
    icon: 'bi-collection',
    color: 'primary',
  },
  {
    key: 'in-progress',
    label: 'In Progress',
    icon: 'bi-clock',
    color: 'warning',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: 'bi-check-circle',
    color: 'success',
  },
  {
    key: 'not-started',
    label: 'Not Started',
    icon: 'bi-play-circle',
    color: 'secondary',
  },
];

// Course Actions Configuration
export const COURSE_ACTIONS: Record<string, CourseAction[]> = {
  'not-started': [
    {
      key: 'start',
      label: 'Start Course',
      icon: 'bi-play-circle',
      color: 'btn-primary',
      action: 'startCourse',
    },
  ],
  'in-progress': [
    {
      key: 'continue',
      label: 'Continue Learning',
      icon: 'bi-play-circle',
      color: 'bg-malibu-purple',
      action: 'continueCourse',
    },
  ],
  completed: [
    {
      key: 'review',
      label: 'Review Course',
      icon: 'bi-arrow-clockwise',
      color: 'success',
      action: 'continueCourse',
    },
  ],
};

// Dropdown Actions Configuration
export const DROPDOWN_ACTIONS = [
  {
    key: 'details',
    label: 'Course Details',
    icon: 'bi-info-circle',
    color: 'text-primary',
    action: 'viewDetails',
  },
  {
    key: 'bookmark',
    label: 'Bookmark',
    icon: 'bi-bookmark',
    color: 'text-secondary',
    action: 'toggleBookmark',
  },
  {
    key: 'share',
    label: 'Share',
    icon: 'bi-share',
    color: 'text-secondary',
    action: 'shareCourse',
  },
  {
    key: 'divider',
    label: '',
    icon: '',
    color: '',
    action: '',
  },
  {
    key: 'unenroll',
    label: 'Unenroll',
    icon: 'bi-x-circle',
    color: 'text-danger',
    action: 'unenrollCourse',
  },
];

// Learning Statistics Configuration
export const LEARNING_STATS_CONFIG = [
  {
    key: 'total',
    label: 'Total Courses',
    icon: 'bi-book',
    color: 'text-primary-gradient',
    getValue: (courses: CourseData[]) => courses.length,
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: 'bi-check-circle',
    color: 'text-success',
    getValue: (courses: CourseData[]) =>
      courses.filter((c) => c.status === 'completed').length,
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: 'bi-clock',
    color: 'text-info',
    getValue: (courses: CourseData[]) =>
      courses.filter((c) => c.status === 'in-progress').length,
  },
  {
    key: 'lessonsCompleted',
    label: 'Lessons Completed',
    icon: 'bi-trophy',
    color: 'text-success',
    getValue: (courses: CourseData[]) =>
      courses.reduce((total, course) => total + course.completedLessons, 0),
  },
];

// Sample Course Data
export const MY_COURSES_DATA: CourseData[] = [
  {
    id: 'course-1',
    title: 'Advanced Tax Planning Strategies',
    description:
      'Master advanced tax planning techniques for businesses and individuals. Learn about tax optimization, compliance, and strategic planning.',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 hours',
    category: 'Tax Planning',
    image: '/images/courses/courseone.webp',
    status: 'in-progress',
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    enrolledDate: new Date('2024-01-15'),
    lastAccessed: new Date('2024-07-20'),
    rating: 4.8,
    level: 'Advanced',
    tags: ['Tax Planning', 'Business', 'Strategy'],
  },
  {
    id: 'course-2',
    title: 'Corporate Tax Compliance',
    description:
      'Complete guide to corporate tax compliance requirements, filing procedures, and regulatory updates.',
    instructor: 'Prof. Michael Chen',
    duration: '8 hours',
    category: 'Corporate Tax',
    image: '/images/courses/coursetwo.webp',
    status: 'completed',
    progress: 100,
    completedLessons: 12,
    totalLessons: 12,
    enrolledDate: new Date('2023-11-10'),
    lastAccessed: new Date('2024-01-05'),
    rating: 4.9,
    level: 'Intermediate',
    tags: ['Corporate Tax', 'Compliance', 'Regulations'],
  },
  {
    id: 'course-3',
    title: 'Personal Income Tax Fundamentals',
    description:
      'Learn the basics of personal income tax, deductions, credits, and filing requirements.',
    instructor: 'Lisa Rodriguez',
    duration: '6 hours',
    category: 'Personal Tax',
    image: '/images/courses/coursethree.webp',
    status: 'not-started',
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    enrolledDate: new Date('2024-07-01'),
    rating: 4.6,
    level: 'Beginner',
    tags: ['Personal Tax', 'Fundamentals', 'Beginner'],
  },
  {
    id: 'course-4',
    title: 'International Tax Law',
    description:
      'Explore international tax regulations, treaties, and cross-border tax planning strategies.',
    instructor: 'Dr. James Wilson',
    duration: '16 hours',
    category: 'International Tax',
    image: '/images/courses/courseone.webp',
    status: 'in-progress',
    progress: 30,
    completedLessons: 6,
    totalLessons: 20,
    enrolledDate: new Date('2024-06-15'),
    lastAccessed: new Date('2024-07-25'),
    rating: 4.7,
    level: 'Advanced',
    tags: ['International Tax', 'Cross-border', 'Advanced'],
  },
  {
    id: 'course-5',
    title: 'Tax Technology and Software',
    description:
      'Master modern tax software, automation tools, and digital compliance solutions.',
    instructor: 'Maria Garcia',
    duration: '10 hours',
    category: 'Tax Technology',
    image: '/images/courses/coursetwo.webp',
    status: 'completed',
    progress: 100,
    completedLessons: 14,
    totalLessons: 14,
    enrolledDate: new Date('2024-03-01'),
    lastAccessed: new Date('2024-05-15'),
    rating: 4.8,
    level: 'Intermediate',
    tags: ['Technology', 'Software', 'Automation'],
  },
  {
    id: 'course-6',
    title: 'Estate and Gift Tax Planning',
    description:
      'Comprehensive course on estate planning, gift tax strategies, and wealth transfer techniques.',
    instructor: 'Robert Thompson',
    duration: '14 hours',
    category: 'Estate Planning',
    image: '/images/courses/coursethree.webp',
    status: 'not-started',
    progress: 0,
    completedLessons: 0,
    totalLessons: 18,
    enrolledDate: new Date('2024-07-20'),
    rating: 4.5,
    level: 'Advanced',
    tags: ['Estate Planning', 'Gift Tax', 'Wealth Management'],
  },
];

// Empty State Configuration
export const EMPTY_STATE_CONFIG = {
  all: {
    icon: 'bi-book',
    title: 'No courses found',
    message: "You haven't enrolled in any courses yet.",
    action: {
      label: 'Browse Courses',
      icon: 'bi-plus-circle',
      route: '/courses',
      color: 'btn-gradient',
    },
  },
  filtered: {
    icon: 'bi-funnel',
    title: 'No courses found',
    message: 'No courses match the selected filter.',
    action: {
      label: 'View All Courses',
      icon: 'bi-arrow-left',
      action: 'clearFilter',
      color: 'outline-primary',
    },
  },
};

// Page Configuration
export const MY_COURSES_PAGE_CONFIG = {
  title: 'My Courses',
  subtitle: 'Manage and continue your learning journey',
  showStats: true,
  showFilters: true,
  itemsPerPage: 10,
  defaultFilter: 'all' as const,
};
