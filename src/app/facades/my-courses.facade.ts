// ========================================
// FACADE PATTERN FOR MY COURSES OPERATIONS
// ========================================

import { CourseData } from '../config/my-courses.config';
import { CourseActionFactory } from '../strategies/course-action.strategies';

export class MyCoursesFacade {
  private courses: CourseData[] = [];
  private activeFilter: string = 'all';

  constructor(initialCourses: CourseData[]) {
    this.courses = [...initialCourses];
  }

  // Simple interface for complex operations
  
  /**
   * Execute any course action with unified interface
   */
  executeCourseAction(action: string, course: CourseData): void {
    CourseActionFactory.executeAction(action, course);
    
    // Additional operations based on action
    switch (action) {
      case 'startCourse':
        this.updateCourseStatus(course.id, 'in-progress');
        break;
      case 'downloadCertificate':
        this.trackCertificateDownload(course.id);
        break;
    }
  }

  /**
   * Get filtered courses with count
   */
  getFilteredData(filter: string = 'all'): {
    courses: CourseData[];
    count: number;
    percentage: number;
  } {
    const filtered = filter === 'all' 
      ? this.courses 
      : this.courses.filter(c => c.status === filter);
    
    return {
      courses: filtered,
      count: filtered.length,
      percentage: this.courses.length > 0 ? (filtered.length / this.courses.length) * 100 : 0
    };
  }

  /**
   * Get comprehensive learning statistics
   */
  getLearningStatistics(): {
    overview: {
      total: number;
      completed: number;
      inProgress: number;
      notStarted: number;
    };
    progress: {
      totalLessons: number;
      completedLessons: number;
      averageProgress: number;
    };
    engagement: {
      recentlyAccessed: CourseData[];
      nextToComplete: CourseData[];
    };
  } {
    const completed = this.courses.filter(c => c.status === 'completed');
    const inProgress = this.courses.filter(c => c.status === 'in-progress');
    const notStarted = this.courses.filter(c => c.status === 'not-started');
    
    const totalLessons = this.courses.reduce((sum, c) => sum + c.totalLessons, 0);
    const completedLessons = this.courses.reduce((sum, c) => sum + c.completedLessons, 0);
    const averageProgress = this.courses.length > 0 
      ? this.courses.reduce((sum, c) => sum + c.progress, 0) / this.courses.length 
      : 0;

    const recentlyAccessed = this.courses
      .filter(c => c.lastAccessed)
      .sort((a, b) => (b.lastAccessed?.getTime() || 0) - (a.lastAccessed?.getTime() || 0))
      .slice(0, 3);

    const nextToComplete = inProgress
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3);

    return {
      overview: {
        total: this.courses.length,
        completed: completed.length,
        inProgress: inProgress.length,
        notStarted: notStarted.length,
      },
      progress: {
        totalLessons,
        completedLessons,
        averageProgress: Math.round(averageProgress),
      },
      engagement: {
        recentlyAccessed,
        nextToComplete,
      }
    };
  }

  /**
   * Bulk operations
   */
  bulkUpdateProgress(updates: Array<{courseId: string; progress: number; completedLessons: number}>): void {
    updates.forEach(update => {
      this.updateCourseProgress(update.courseId, update.progress, update.completedLessons);
    });
  }

  searchCourses(query: string): CourseData[] {
    const searchTerm = query.toLowerCase();
    return this.courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Private helper methods
  private updateCourseStatus(courseId: string, status: CourseData['status']): void {
    const courseIndex = this.courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      this.courses[courseIndex] = {
        ...this.courses[courseIndex],
        status,
        lastAccessed: new Date()
      };
    }
  }

  private updateCourseProgress(courseId: string, progress: number, completedLessons: number): void {
    const courseIndex = this.courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      this.courses[courseIndex] = {
        ...this.courses[courseIndex],
        progress,
        completedLessons,
        lastAccessed: new Date()
      };
    }
  }

  private trackCertificateDownload(courseId: string): void {
    // Analytics tracking
    console.log(`Certificate downloaded for course: ${courseId}`);
  }
}
