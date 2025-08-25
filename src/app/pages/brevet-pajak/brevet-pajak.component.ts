import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-brevet-pajak',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brevet-pajak.component.html',
  styleUrls: ['./brevet-pajak.component.scss'],
})
export class BrevetPajakComponent {
  brevetPrograms = [
    {
      id: 'a',
      title: 'Brevet Pajak A',
      subtitle: 'Dasar-dasar Perpajakan',
      description:
        'Program pelatihan dasar perpajakan untuk pemahaman fundamental sistem pajak Indonesia',
      price: 2500000,
      duration: '40 Jam',
      modules: 8,
      level: 'Beginner',
      icon: 'bi-1-circle-fill',
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
      features: [
        'Pengenalan Sistem Pajak Indonesia',
        'Pajak Penghasilan (PPh) Dasar',
        'Pajak Pertambahan Nilai (PPN) Dasar',
        'Tata Cara Perpajakan',
        'Kewajiban Perpajakan',
        'Sanksi dan Pemeriksaan Pajak',
      ],
    },
    {
      id: 'b',
      title: 'Brevet Pajak B',
      subtitle: 'Perpajakan Menengah',
      description:
        'Program pelatihan perpajakan tingkat menengah untuk praktisi dan konsultan pajak',
      price: 3500000,
      duration: '60 Jam',
      modules: 12,
      level: 'Intermediate',
      icon: 'bi-2-circle-fill',
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10',
      features: [
        'PPh Badan dan Orang Pribadi Lanjutan',
        'PPN dan PPnBM Lanjutan',
        'Pajak Daerah dan Retribusi',
        'Transfer Pricing',
        'Perencanaan Pajak',
        'Tax Compliance dan Audit',
      ],
    },
    {
      id: 'c',
      title: 'Brevet Pajak C',
      subtitle: 'Konsultan Pajak Profesional',
      description:
        'Program pelatihan perpajakan tingkat lanjut untuk menjadi konsultan pajak bersertifikat',
      price: 4500000,
      duration: '80 Jam',
      modules: 16,
      level: 'Advanced',
      icon: 'bi-3-circle-fill',
      color: 'text-warning',
      bgColor: 'bg-warning bg-opacity-10',
      features: [
        'International Taxation',
        'Tax Dispute Resolution',
        'Advanced Transfer Pricing',
        'Corporate Restructuring',
        'Tax Technology & Digital',
        'Professional Ethics',
      ],
    },
  ];

  constructor(private router: Router) {}

  navigateToProgram(programId: string) {
    // Navigate to course learning page for the specific brevet program
    this.router.navigate(['/course-learning', `brevet-${programId}`]);
  }

  startProgram(programId: string) {
    // Start the program directly - navigate to first lesson
    this.router.navigate([
      '/course-learning',
      `brevet-${programId}`,
      'lesson-1',
    ]);
  }
}
