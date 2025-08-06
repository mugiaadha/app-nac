import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  instructor: string;
  duration: string;
  enrolledDate: Date;
  lastAccessed?: Date;
  image: string;
  totalLessons: number;
  completedLessons: number;
  category: string;
}

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  courses: Course[] = [
    {
      id: '1',
      title: 'Fundamental Akuntansi',
      description: 'Pelajari dasar-dasar akuntansi dari nol hingga mahir dengan praktik langsung',
      progress: 75,
      status: 'in-progress',
      instructor: 'Dr. Sari Widiastuti',
      duration: '8 weeks',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-02-15'),
      image: '/images/courses/courseone.webp',
      totalLessons: 24,
      completedLessons: 18,
      category: 'Accounting'
    },
    {
      id: '2',
      title: 'Pajak Penghasilan',
      description: 'Memahami perhitungan dan pelaporan PPh untuk perusahaan dan individu',
      progress: 100,
      status: 'completed',
      instructor: 'Prof. Bambang Sutrisno',
      duration: '6 weeks',
      enrolledDate: new Date('2023-12-01'),
      lastAccessed: new Date('2024-01-20'),
      image: '/images/courses/coursetwo.webp',
      totalLessons: 18,
      completedLessons: 18,
      category: 'Tax'
    },
    {
      id: '3',
      title: 'Pelaporan Pajak Digital',
      description: 'Pelajari cara pelaporan pajak menggunakan sistem digital terbaru DJP',
      progress: 0,
      status: 'not-started',
      instructor: 'Dra. Lestari Handayani',
      duration: '4 weeks',
      enrolledDate: new Date('2024-02-20'),
      image: '/images/courses/coursethree.webp',
      totalLessons: 12,
      completedLessons: 0,
      category: 'Digital Tax'
    }
  ];

  filteredCourses: Course[] = [];
  activeFilter: string = 'all';

  constructor() {}

  ngOnInit() {
    this.filteredCourses = this.courses;
  }

  filterCourses(status: string) {
    this.activeFilter = status;
    if (status === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.status === status);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed': return 'bg-grow-early';
      case 'in-progress': return 'bg-malibu-beach';
      case 'not-started': return 'bg-sunny-morning text-dark';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return 'Unknown';
    }
  }

  continueCourse(course: Course) {
    console.log('Continue course:', course.title);
  }

  startCourse(course: Course) {
    console.log('Start course:', course.title);
  }

  getCompletedCount(): number {
    return this.courses.filter(c => c.status === 'completed').length;
  }

  getInProgressCount(): number {
    return this.courses.filter(c => c.status === 'in-progress').length;
  }

  getNotStartedCount(): number {
    return this.courses.filter(c => c.status === 'not-started').length;
  }

  getTotalCompletedLessons(): number {
    return this.courses.reduce((total, course) => total + course.completedLessons, 0);
  }
}
