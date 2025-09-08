import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from '../../../shared/feedback-form/feedback-form.component';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [CommonModule, FeedbackFormComponent],
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent {}
