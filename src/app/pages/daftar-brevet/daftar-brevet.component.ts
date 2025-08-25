import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SiteSettingsService } from '../../state/site-settings.service';

interface BrevetProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  modules: number;
  level: string;
  icon: string;
  color: string;
  bgColor: string;
  schedule: {
    startDate: string;
    endDate: string;
    days: string;
    time: string;
  };
}

@Component({
  selector: 'app-daftar-brevet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './daftar-brevet.component.html',
  styleUrls: ['./daftar-brevet.component.scss']
})
export class DaftarBrevetComponent implements OnInit {
  brevetType: string | null = null;
  brevetTitle: string = '';
  logoUrl: string = '';
  program: BrevetProgram | null = null;

  formData = {
    nama: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  private brevetPrograms: BrevetProgram[] = [
    {
      id: 'a',
      title: 'Brevet Pajak A',
      subtitle: 'Dasar-dasar Perpajakan',
      description: 'Program pelatihan dasar perpajakan untuk pemahaman fundamental',
      price: 2500000,
      duration: '40 Jam',
      modules: 8,
      level: 'Beginner',
      icon: 'bi-1-circle-fill',
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
      schedule: {
        startDate: '15 September 2025',
        endDate: '30 Oktober 2025',
        days: 'Senin, Rabu, Jumat',
        time: '19:00 - 22:00 WIB'
      }
    },
    {
      id: 'b',
      title: 'Brevet Pajak B',
      subtitle: 'Perpajakan Menengah',
      description: 'Program pelatihan perpajakan tingkat menengah',
      price: 3500000,
      duration: '60 Jam',
      modules: 12,
      level: 'Intermediate',
      icon: 'bi-2-circle-fill',
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10',
      schedule: {
        startDate: '1 Oktober 2025',
        endDate: '15 Desember 2025',
        days: 'Selasa, Kamis, Sabtu',
        time: '19:00 - 22:00 WIB'
      }
    },
    {
      id: 'c',
      title: 'Brevet Pajak C',
      subtitle: 'Konsultan Pajak Profesional',
      description: 'Program pelatihan perpajakan tingkat lanjut',
      price: 4500000,
      duration: '80 Jam',
      modules: 16,
      level: 'Advanced',
      icon: 'bi-3-circle-fill',
      color: 'text-warning',
      bgColor: 'bg-warning bg-opacity-10',
      schedule: {
        startDate: '15 Oktober 2025',
        endDate: '31 Januari 2026',
        days: 'Senin, Rabu, Jumat, Sabtu',
        time: '19:00 - 22:00 WIB'
      }
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public siteSettings: SiteSettingsService
  ) {
    this.siteSettings.settings$.subscribe((settings) => {
      this.logoUrl = settings.logo || './logo-daftar.svg';
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.brevetType = params.get('type');
      if (!['a', 'b', 'c'].includes(this.brevetType || '')) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.program = this.brevetPrograms.find((p) => p.id === this.brevetType) || null;
      if (this.program) {
        this.brevetTitle = this.program.title;
      }
    });
  }

  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    // Handle form submission
    console.log('Form submitted:', {
      ...this.formData,
      brevetType: this.brevetType,
      program: this.program?.title
    });
  }
}
