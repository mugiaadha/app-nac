// ========================================
// STRATEGY PATTERN FOR COURSE ACTIONS
// ========================================

import { CourseData } from '../config/my-courses.config';

// Strategy interface
export interface CourseActionStrategy {
  execute(course: CourseData): void;
}

// Concrete strategies
export class StartCourseStrategy implements CourseActionStrategy {
  execute(course: CourseData): void {
    console.log('Starting course:', course.title);
    // Navigate to course content
    // Update course status
    // Track analytics event
  }
}

export class ContinueCourseStrategy implements CourseActionStrategy {
  execute(course: CourseData): void {
    console.log('Continuing course:', course.title);
    // Navigate to last accessed lesson
    // Update last accessed timestamp
    // Track progress event
  }
}

export class DownloadCertificateStrategy implements CourseActionStrategy {
  execute(course: CourseData): void {
    console.log('Downloading certificate for:', course.title);
    // Generate certificate PDF
    // Track download event
    // Show success notification
  }
}

export class ViewDetailsStrategy implements CourseActionStrategy {
  execute(course: CourseData): void {
    console.log('Viewing details for:', course.title);
    // Navigate to course detail page
    // Track view event
  }
}

export class ShareCourseStrategy implements CourseActionStrategy {
  execute(course: CourseData): void {
    console.log('Sharing course:', course.title);
    // Open share modal
    // Generate share link
    // Track share event
  }
}

// Strategy factory
export class CourseActionFactory {
  private static strategies: Map<string, CourseActionStrategy> = new Map([
    ['startCourse', new StartCourseStrategy()],
    ['continueCourse', new ContinueCourseStrategy()],
    ['downloadCertificate', new DownloadCertificateStrategy()],
    ['viewDetails', new ViewDetailsStrategy()],
    ['shareCourse', new ShareCourseStrategy()],
  ]);

  static getStrategy(action: string): CourseActionStrategy | null {
    return this.strategies.get(action) || null;
  }

  static executeAction(action: string, course: CourseData): void {
    const strategy = this.getStrategy(action);
    if (strategy) {
      strategy.execute(course);
    } else {
      console.warn('Unknown action:', action);
    }
  }
}
