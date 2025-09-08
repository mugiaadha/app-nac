import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from '../../../shared/feedback-form/feedback-form.component';

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule, FeedbackFormComponent],
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss'],
})
export class ComplianceComponent {}
