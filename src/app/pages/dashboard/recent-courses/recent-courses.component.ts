import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MY_COURSES_DATA, CourseData, COURSE_STATUS_CONFIG } from '../../../config/my-courses.config';

@Component({
  selector: 'app-recent-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.scss']
})
export class RecentCoursesComponent implements OnInit {
  allCourses: CourseData[] = [];
  filteredCourses: CourseData[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'all';
  selectedCategory: string = 'all';
  
  // Filter options
  statusFilters = [
    { key: 'all', label: 'Semua Status', count: 0 },
    { key: 'in-progress', label: 'Sedang Berjalan', count: 0 },
    { key: 'completed', label: 'Selesai', count: 0 },
    { key: 'not-started', label: 'Belum Dimulai', count: 0 }
  ];

  categories = [
    { key: 'all', label: 'Semua Kategori' },
    { key: 'UMKM', label: 'UMKM' },
    { key: 'Regulasi', label: 'Regulasi' },
    { key: 'Startup', label: 'Startup' },
    { key: 'Pajak Pribadi', label: 'Pajak Pribadi' },
    { key: 'E-Commerce', label: 'E-Commerce' },
    { key: 'Perpajakan Dasar', label: 'Perpajakan Dasar' },
    { key: 'Perpajakan Menengah', label: 'Perpajakan Menengah' },
    { key: 'Perpajakan Lanjut', label: 'Perpajakan Lanjut' }
  ];

  sortOptions = [
    { key: 'recent', label: 'Terbaru Diakses' },
    { key: 'progress', label: 'Progress' },
    { key: 'title', label: 'Nama A-Z' },
    { key: 'duration', label: 'Durasi' }
  ];

  selectedSort: string = 'recent';

  constructor() {}

  ngOnInit() {
    this.loadCourses();
    this.updateFilterCounts();
    this.applyFilters();
  }

  loadCourses() {
    // Get all courses data
    this.allCourses = [...MY_COURSES_DATA];
  }

  updateFilterCounts() {
    this.statusFilters.forEach(filter => {
      if (filter.key === 'all') {
        filter.count = this.allCourses.length;
      } else {
        filter.count = this.allCourses.filter(course => course.status === filter.key).length;
      }
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onFilterChange(filterKey: string) {
    this.selectedFilter = filterKey;
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.selectedSort = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.allCourses];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(course => course.status === this.selectedFilter);
    }

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === this.selectedCategory);
    }

    // Apply sorting
    filtered = this.sortCourses(filtered);

    this.filteredCourses = filtered;
  }

  sortCourses(courses: CourseData[]): CourseData[] {
    return courses.sort((a, b) => {
      switch (this.selectedSort) {
        case 'recent':
          return new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          return this.parseDuration(a.duration) - this.parseDuration(b.duration);
        default:
          return 0;
      }
    });
  }

  parseDuration(duration: string): number {
    // Convert duration string to minutes for comparison
    const hours = parseInt(duration.match(/(\d+)\s*jam/i)?.[1] || '0');
    const minutes = parseInt(duration.match(/(\d+)\s*menit/i)?.[1] || '0');
    return hours * 60 + minutes;
  }

  getStatusConfig(status: string) {
    return COURSE_STATUS_CONFIG[status as keyof typeof COURSE_STATUS_CONFIG] || COURSE_STATUS_CONFIG['not-started'];
  }

  getProgressWidth(progress: number): string {
    return `${Math.max(0, Math.min(100, progress))}%`;
  }

  continueCourse(courseId: string) {
    // Navigate to course learning
    console.log('Continue course:', courseId);
  }

  viewCourseDetails(courseId: string) {
    // Navigate to course details
    console.log('View course details:', courseId);
  }

  getLastAccessedText(date: Date | undefined): string {
    if (!date) return 'Belum pernah diakses';
    
    const now = new Date();
    const lastAccessed = new Date(date);
    const diffTime = Math.abs(now.getTime() - lastAccessed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} minggu lalu`;
    return `${Math.ceil(diffDays / 30)} bulan lalu`;
  }
}
