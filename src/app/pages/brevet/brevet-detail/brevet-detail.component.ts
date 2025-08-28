import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

interface BrevetProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  modules: number;
  level: string;
  color: string;
  bgColor: string;
  btnOutLine: string;
  curriculum: string[];
  benefits: string[];
  requirements: string[];
  schedule: {
    startDate: string;
    endDate: string;
    days: string;
    time: string;
  };
}

@Component({
  selector: 'app-brevet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './brevet-detail.component.html',
  styleUrls: ['./brevet-detail.component.scss'],
})
export class BrevetDetailComponent implements OnInit {
  programId: string = '';
  program: BrevetProgram | null = null;

  private programs: BrevetProgram[] = [
    {
      id: 'a',
      title: 'Brevet Pajak A',
      subtitle: 'Dasar-dasar Perpajakan',
      description:
        'Program pelatihan dasar perpajakan untuk pemahaman fundamental sistem pajak Indonesia. Cocok untuk pemula yang ingin memahami dasar-dasar perpajakan.',
      duration: '40 Jam',
      modules: 8,
      level: 'Beginner',
      color: 'text-primary',
      bgColor: 'bg-malibu-purple',
      btnOutLine: 'btn-outline-primary',
      curriculum: [
        'Pengenalan Sistem Perpajakan Indonesia',
        'Ketentuan Umum dan Tata Cara Perpajakan (KUP)',
        'Pajak Penghasilan (PPh) Orang Pribadi',
        'Pajak Penghasilan (PPh) Badan',
        'Pajak Pertambahan Nilai (PPN)',
        'Pajak Penjualan atas Barang Mewah (PPnBM)',
        'Pajak Bumi dan Bangunan (PBB)',
        'Sanksi dan Pemeriksaan Pajak',
      ],
      benefits: [
        'Memahami sistem perpajakan Indonesia',
        'Dapat menghitung pajak penghasilan',
        'Memahami mekanisme PPN',
        'Mengetahui kewajiban perpajakan',
        'Sertifikat Brevet Pajak A',
        'Akses ke komunitas alumni',
      ],
      requirements: [
        'Minimal lulusan SMA/sederajat',
        'Memiliki minat dalam bidang perpajakan',
        'Tidak ada pengalaman khusus yang diperlukan',
      ],
      schedule: {
        startDate: '15 September 2025',
        endDate: '30 Oktober 2025',
        days: 'Senin, Rabu, Jumat',
        time: '19:00 - 22:00 WIB',
      },
    },
    {
      id: 'b',
      title: 'Brevet Pajak B',
      subtitle: 'Perpajakan Menengah',
      description:
        'Program pelatihan perpajakan tingkat menengah untuk praktisi dan konsultan pajak. Mengembangkan keahlian perpajakan yang lebih mendalam.',
      duration: '60 Jam',
      modules: 12,
      level: 'Intermediate',
      color: 'text-success',
      bgColor: 'bg-success',
      btnOutLine: 'btn-outline-success',
      curriculum: [
        'PPh Badan Lanjutan',
        'PPh Orang Pribadi Lanjutan',
        'PPN dan PPnBM Lanjutan',
        'Pajak Daerah dan Retribusi',
        'Transfer Pricing',
        'Pajak International',
        'Perencanaan Pajak',
        'Tax Compliance',
        'Audit Pajak',
        'Sengketa Pajak',
        'Tax Technology',
        'Ethics dalam Perpajakan',
      ],
      benefits: [
        'Keahlian perpajakan tingkat menengah',
        'Dapat menjadi konsultan pajak junior',
        'Memahami transfer pricing',
        'Sertifikat Brevet Pajak B',
        'Job placement assistance',
        'Networking dengan profesional',
      ],
      requirements: [
        'Memiliki Brevet Pajak A atau pengalaman setara',
        'Minimal lulusan D3/S1',
        'Pengalaman kerja di bidang akuntansi/pajak (diutamakan)',
      ],
      schedule: {
        startDate: '1 Oktober 2025',
        endDate: '15 Desember 2025',
        days: 'Selasa, Kamis, Sabtu',
        time: '19:00 - 22:00 WIB',
      },
    },
    {
      id: 'c',
      title: 'Brevet Pajak C',
      subtitle: 'Konsultan Pajak Profesional',
      description:
        'Program pelatihan perpajakan tingkat lanjut untuk menjadi konsultan pajak bersertifikat. Persiapan untuk ujian konsultan pajak.',
      duration: '80 Jam',
      modules: 16,
      level: 'Advanced',
      color: 'text-warning',
      bgColor: 'bg-warning',
      btnOutLine: 'btn-outline-warning',
      curriculum: [
        'Advanced Corporate Taxation',
        'International Tax Planning',
        'Tax Dispute Resolution',
        'Advanced Transfer Pricing',
        'Corporate Restructuring',
        'Tax Due Diligence',
        'Digital Tax',
        'Tax Technology Implementation',
        'Professional Ethics',
        'Business Advisory',
        'Tax Risk Management',
        'Advanced Audit Techniques',
        'Tax Court Procedures',
        'Regulatory Updates',
        'Case Studies',
        'Final Project',
      ],
      benefits: [
        'Keahlian konsultan pajak profesional',
        'Persiapan ujian konsultan pajak',
        'Dapat mendirikan kantor konsultan',
        'Sertifikat Brevet Pajak C',
        'Mentoring program',
        'Lifetime career support',
      ],
      requirements: [
        'Memiliki Brevet Pajak B',
        'Minimal lulusan S1',
        'Pengalaman kerja minimal 2 tahun di bidang perpajakan',
      ],
      schedule: {
        startDate: '15 Oktober 2025',
        endDate: '31 Januari 2026',
        days: 'Senin, Rabu, Jumat, Sabtu',
        time: '19:00 - 22:00 WIB',
      },
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.program = this.programs.find((p) => p.id === this.programId) || null;
    });
  }

  enrollNow() {
    // Navigate to daftar-brevet/a as requested
    this.router.navigate(['/daftar-brevet/a']);
  }

  downloadBrochure() {
    console.log(
      `Downloading brochure for Brevet ${this.programId.toUpperCase()}`
    );
    // Implementation for brochure download
  }

  getRelatedPrograms(): BrevetProgram[] {
    return this.programs.filter((p) => p.id !== this.programId);
  }
}
