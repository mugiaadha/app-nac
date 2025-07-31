import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  imports: [CommonModule],
})
export class CourseDetailComponent {
  courseId: string | null = null;
  opened: number | null = null;
  materiList = [
    {
      title: 'Pendahuluan',
      content: 'Penjelasan umum tentang kursus dan tujuan pembelajaran.',
    },
    {
      title: 'Materi MP 1 Konsep Dasar Pajak',
      content: 'Dasar-dasar pajak dan regulasi yang berlaku.',
    },
    {
      title: 'Materi MP 2 Indikator Pengukuran Kinerja Pajak',
      content: 'Cara mengukur kinerja pajak secara efektif.',
    },
    {
      title: 'Materi MP 3 Prosedur Pelaksanaan Evaluasi Pajak',
      content: 'Langkah-langkah evaluasi dan pelaksanaan pajak.',
    },
    {
      title: 'Materi MP 4 Struktur Laporan Evaluasi Pajak',
      content: 'Format dan struktur laporan evaluasi pajak.',
    },
  ];

  reviews = [
    {
      img: './images/testimonial/user.svg',
      name: 'Budi Santoso',
      rating: 5.0,
      comment: 'Materinya sangat jelas dan mudah dipahami, cocok untuk pemula!',
    },
    {
      img: './images/testimonial/userone.webp',
      name: 'Dewi Anggraini',
      rating: 4.8,
      comment: 'Sangat membantu untuk memahami pajak UMKM, recommended!',
    },
    {
      img: './images/testimonial/usertwo.webp',
      name: 'Rina Sari',
      rating: 4.9,
      comment:
        'Instruktur ramah dan penjelasan detail, saya jadi lebih paham pajak!',
    },
    {
      img: './images/testimonial/userthree.webp',
      name: 'Andi Wijaya',
      rating: 4.7,
      comment: 'Materi lanjutan sangat bermanfaat untuk freelancer.',
    },
    {
      img: './images/testimonial/user.svg',
      name: 'Linda Kusuma',
      rating: 5.0,
      comment: 'Kursus ini sangat membantu perusahaan kami.',
    },
  ];
  showAllReviews = false;

  get displayedReviews() {
    return this.showAllReviews ? this.reviews : this.reviews.slice(0, 3);
  }

  constructor(private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }
}
