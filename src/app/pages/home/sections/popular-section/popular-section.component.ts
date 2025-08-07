import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COURSES_DATA } from '../../../../config/courses.config';

@Component({
  selector: 'app-popular-section',
  templateUrl: './popular-section.component.html',
  styleUrls: ['./popular-section.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class PopularSectionComponent {
  popularCourses = COURSES_DATA.slice(0, 4);
}
