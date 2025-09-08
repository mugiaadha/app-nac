import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from '../../../shared/feedback-form/feedback-form.component';

@Component({
  selector: 'app-konsultasi',
  standalone: true,
  imports: [CommonModule, FeedbackFormComponent],
  templateUrl: './konsultasi.component.html',
  styleUrls: ['./konsultasi.component.scss'],
})
export class KonsultasiComponent {}
