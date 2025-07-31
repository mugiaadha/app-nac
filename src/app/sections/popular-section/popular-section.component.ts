import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { COURSES_DATA } from '../../config/courses.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-section',
  templateUrl: './popular-section.component.html',
  styleUrls: ['./popular-section.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class PopularSectionComponent {
  popularCourses = COURSES_DATA.slice(0, 4);
}
