import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { COURSES_DATA } from '../../config/courses.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-newest-section',
  templateUrl: './newest-section.component.html',
  styleUrls: ['./newest-section.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class NewestSectionComponent {
  newestCourses = COURSES_DATA.slice(-4);
}
