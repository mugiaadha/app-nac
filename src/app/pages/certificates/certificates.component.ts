import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../state/auth.service';

interface Certificate {
  id: string;
  courseName: string;
  issueDate: Date;
  certificateNumber: string;
  status: 'issued' | 'pending' | 'expired';
  downloadUrl?: string;
  courseImage: string;
  instructor: string;
  completionScore: number;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [
    {
      id: '1',
      courseName: 'Fundamental Akuntansi',
      issueDate: new Date('2024-01-15'),
      certificateNumber: 'NAC-2024-001',
      status: 'issued',
      courseImage: '/images/courses/courseone.webp',
      instructor: 'Dr. Sari Widiastuti',
      completionScore: 95,
      downloadUrl: '#'
    },
    {
      id: '2',
      courseName: 'Pajak Penghasilan',
      issueDate: new Date('2024-02-20'),
      certificateNumber: 'NAC-2024-002',
      status: 'issued',
      courseImage: '/images/courses/coursetwo.webp',
      instructor: 'Prof. Bambang Sutrisno',
      completionScore: 88,
      downloadUrl: '#'
    },
    {
      id: '3',
      courseName: 'Pelaporan Pajak Digital',
      issueDate: new Date('2024-03-10'),
      certificateNumber: 'NAC-2024-003',
      status: 'pending',
      courseImage: '/images/courses/coursethree.webp',
      instructor: 'Dra. Lestari Handayani',
      completionScore: 92
    }
  ];

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  downloadCertificate(certificate: Certificate) {
    if (certificate.downloadUrl) {
      // Simulate download
      console.log('Downloading certificate:', certificate.certificateNumber);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'issued': return 'bg-grow-early';
      case 'pending': return 'bg-sunny-morning text-dark';
      case 'expired': return 'bg-love-kiss';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'issued': return 'Issued';
      case 'pending': return 'Pending';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  }

  getIssuedCount(): number {
    return this.certificates.filter(c => c.status === 'issued').length;
  }

  getPendingCount(): number {
    return this.certificates.filter(c => c.status === 'pending').length;
  }

  getAverageScore(): number {
    if (this.certificates.length === 0) return 0;
    const total = this.certificates.reduce((sum, c) => sum + c.completionScore, 0);
    return Math.round(total / this.certificates.length);
  }
}
