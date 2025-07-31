import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: ':id', component: CourseDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoursesComponent,
    CourseDetailComponent,
  ],
})
export class CoursesModule {}
