import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  certificateNumber: string;
  duration: string;
  grade?: string;
}

@Component({
  selector: 'app-certificate-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-template.component.html',
  styleUrls: ['./certificate-template.component.scss'],
})
export class CertificateTemplateComponent {
  @Input() certificateData: CertificateData = {
    studentName: 'John Doe',
    courseName: 'Fundamental Akuntansi',
    instructorName: 'Dr. Sari Widiastuti',
    completionDate: new Date(),
    certificateNumber: 'NAC-2024-001',
    duration: '40 hours',
    grade: 'A',
  };

  @Input() showActions: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  downloadCertificate() {
    // Implementasi download akan ditambahkan nanti
    console.log(
      'Downloading certificate:',
      this.certificateData.certificateNumber,
    );
  }

  printCertificate() {
    window.print();
  }

  shareCertificate() {
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${this.certificateData.courseName}`,
        text: `I have completed ${this.certificateData.courseName} course!`,
        url: window.location.href,
      });
    }
  }
}
