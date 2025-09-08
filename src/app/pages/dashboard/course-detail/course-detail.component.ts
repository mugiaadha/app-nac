import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  CourseData,
  MY_COURSES_DATA,
  COURSE_STATUS_CONFIG,
} from '../../../config/my-courses.config';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: CourseData | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  statusConfig = COURSE_STATUS_CONFIG;

  // Make Math available in template
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      } else {
        this.error = 'Course ID not provided';
        this.isLoading = false;
      }
    });
  }

  private loadCourse(courseId: string) {
    this.isLoading = true;
    this.error = null;

    // Simulate API call - in real app this would come from a service
    setTimeout(() => {
      const foundCourse = MY_COURSES_DATA.find((c) => c.id === courseId);

      if (foundCourse) {
        this.course = foundCourse;
      } else {
        this.error = 'Course not found';
      }

      this.isLoading = false;
    }, 500);
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
  startCourse() {
    if (this.course) {
      console.log('Starting course:', this.course.title);
      this.router.navigate(['/course-learning', this.course.id]);
    }
  }

  continueCourse() {
    if (this.course) {
      console.log('Continuing course:', this.course.title);
      this.router.navigate(['/course-learning', this.course.id]);
    }
  }

  downloadCertificate() {
    if (this.course) {
      console.log('Downloading certificate for:', this.course.title);
      // Generate and download certificate
    }
  }

  shareCourse() {
    if (this.course) {
      console.log('Sharing course:', this.course.title);
      // Open share modal or copy link
      if (navigator.share) {
        navigator.share({
          title: this.course.title,
          text: this.course.description,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Course link copied to clipboard!');
      }
    }
  }

  toggleBookmark() {
    if (this.course) {
      console.log('Toggling bookmark for:', this.course.title);
      // Toggle bookmark status
    }
  }

  unenrollCourse() {
    if (
      this.course &&
      confirm('Are you sure you want to unenroll from this course?')
    ) {
      console.log('Unenrolling from course:', this.course.title);
      // Unenroll and navigate back to my courses
      this.router.navigate(['/dashboard/my-courses']);
    }
  }

  // Navigation methods
  goBack() {
    this.location.back();
  }

  goToMyCourses() {
    this.router.navigate(['/dashboard/my-courses']);
  }

  // Utility methods
  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('bi-star-fill');
    }

    if (hasHalfStar) {
      stars.push('bi-star-half');
    }

    while (stars.length < 5) {
      stars.push('bi-star');
    }

    return stars;
  }

  getCompletionPercentage(): number {
    if (!this.course || this.course.totalLessons === 0) return 0;
    return Math.round(
      (this.course.completedLessons / this.course.totalLessons) * 100,
    );
  }

  getEstimatedTimeRemaining(): string {
    if (!this.course) return '0 minutes';

    const totalMinutes =
      parseInt(this.course.duration.replace(' hours', '')) * 60;
    const completedMinutes = totalMinutes * (this.course.progress / 100);
    const remainingMinutes = totalMinutes - completedMinutes;

    if (remainingMinutes <= 0) return 'Completed';

    const hours = Math.floor(remainingMinutes / 60);
    const minutes = Math.round(remainingMinutes % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  }
}
