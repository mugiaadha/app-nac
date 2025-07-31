import { Component } from '@angular/core';
import { COURSES_DATA } from '../../config/courses.config';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class CoursesComponent {
  visibleCount = 8;
  searchValue: string = '';
  allCourses = COURSES_DATA;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchValue = params['search'];
      }
    });
  }

  get filteredCourses() {
    const query = (this.searchValue || '').trim().toLowerCase();
    if (!query) return this.allCourses;
    return this.allCourses.filter((course) => {
      const title = course.title ? course.title.toLowerCase() : '';
      const author = course.author ? course.author.toLowerCase() : '';
      const category = course.category ? course.category.toLowerCase() : '';
      return (
        title.includes(query) || author.includes(query) || category.includes(query)
      );
    });
  }

  get visibleCourses() {
    return this.filteredCourses.slice(0, this.visibleCount);
  }

  showMore() {
    this.visibleCount += 4;
  }

  onSearch() {
    this.visibleCount = 8;
  }
}
