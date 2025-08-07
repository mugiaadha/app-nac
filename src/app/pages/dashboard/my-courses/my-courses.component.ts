import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  COURSE_FILTERS,
  COURSE_STATUS_CONFIG,
  CourseData,
  CourseFilter,
  LEARNING_STATS_CONFIG,
  MY_COURSES_DATA,
  MY_COURSES_PAGE_CONFIG,
} from '../../../config/my-courses.config';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  // Data from config
  courses: CourseData[] = MY_COURSES_DATA;
  filteredCourses: CourseData[] = [];
  filters: CourseFilter[] = COURSE_FILTERS;
  statusConfig = COURSE_STATUS_CONFIG;
  learningStats = LEARNING_STATS_CONFIG;
  pageConfig = MY_COURSES_PAGE_CONFIG;

  // Component state
  activeFilter: string = MY_COURSES_PAGE_CONFIG.defaultFilter;

  constructor() {}

  ngOnInit() {
    this.filteredCourses = this.courses;
  }

  // Filter methods
  filterCourses(status: string) {
    this.activeFilter = status;
    if (status === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(
        (course) => course.status === status
      );
    }
  }

  getFilterCount(filterKey: string): number {
    if (filterKey === 'all') return this.courses.length;
    return this.courses.filter((course) => course.status === filterKey).length;
  }

  // Status methods
  getStatusBadgeClass(status: string): string {
    const config = this.statusConfig[status as keyof typeof this.statusConfig];
    return config ? config.badge : 'badge-secondary';
  }

  getStatusText(status: string): string {
    const config = this.statusConfig[status as keyof typeof this.statusConfig];
    return config ? config.text : 'Unknown';
  }

  getProgressBarClass(status: string): string {
    const config = this.statusConfig[status as keyof typeof this.statusConfig];
    return config ? config.progressColor : 'bg-malibu-beach';
  }

  // Action methods
  executeAction(action: string, course: CourseData) {
    switch (action) {
      case 'startCourse':
        this.startCourse(course);
        break;
      case 'continueCourse':
        this.continueCourse(course);
        break;
      case 'downloadCertificate':
        this.downloadCertificate(course);
        break;
      case 'viewCertificate':
        this.viewCertificate(course);
        break;
      case 'viewDetails':
        this.viewDetails(course);
        break;
      case 'toggleBookmark':
        this.toggleBookmark(course);
        break;
      case 'shareCourse':
        this.shareCourse(course);
        break;
      case 'unenrollCourse':
        this.unenrollCourse(course);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  // Course action methods
  startCourse(course: CourseData) {
    console.log('Starting course:', course.title);
    // Implement course start logic
  }

  continueCourse(course: CourseData) {
    console.log('Continuing course:', course.title);
    // Implement course continue logic
  }

  downloadCertificate(course: CourseData) {
    console.log('Downloading certificate for:', course.title);
    // Implement certificate download logic
  }

  viewCertificate(course: CourseData) {
    console.log('Viewing certificate for:', course.title);
    // Implement certificate view logic
  }

  viewDetails(course: CourseData) {
    console.log('Viewing details for:', course.title);
    // Implement course details logic
  }

  toggleBookmark(course: CourseData) {
    console.log('Toggling bookmark for:', course.title);
    // Implement bookmark logic
  }

  shareCourse(course: CourseData) {
    console.log('Sharing course:', course.title);
    // Implement share logic
  }

  unenrollCourse(course: CourseData) {
    console.log('Unenrolling from course:', course.title);
    // Implement unenroll logic
  }

  // Get statistic value using config
  getStatValue(statKey: string): number {
    const stat = this.learningStats.find((s) => s.key === statKey);
    return stat ? stat.getValue(this.courses) : 0;
  }

  // Clear filter
  clearFilter() {
    this.filterCourses('all');
  }
}
