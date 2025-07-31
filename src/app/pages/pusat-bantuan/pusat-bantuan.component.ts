import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pusat-bantuan',
  standalone: true,
  templateUrl: './pusat-bantuan.component.html',
  styleUrls: ['./pusat-bantuan.component.scss'],
  imports: [CommonModule],
})
export class PusatBantuanComponent {
  faqs = [
    {
      question: 'Bagaimana cara mendaftar dan login di NAC?',
      answer:
        'Klik tombol Daftar di pojok kanan atas, isi data diri, lalu login dengan email dan password yang didaftarkan.',
    },
    {
      question: 'Apakah semua pelatihan di NAC gratis?',
      answer:
        'Sebagian pelatihan gratis, sebagian berbayar. Info detail harga dan promo bisa dilihat di halaman kursus.',
    },
    {
      question: 'Bagaimana cara mendapatkan sertifikat pelatihan?',
      answer:
        'Sertifikat akan diberikan setelah Anda menyelesaikan seluruh materi dan lulus ujian akhir pelatihan.',
    },
    {
      question: 'Bagaimana cara konsultasi pajak di NAC?',
      answer:
        'Anda bisa mengakses menu Layanan > Konsultasi dan mengisi form konsultasi sesuai kebutuhan.',
    },
    {
      question: 'Bagaimana menghubungi tim support NAC?',
      answer:
        'Gunakan menu Kontak di bagian bawah halaman atau email ke info@nac.id untuk pertanyaan lebih lanjut.',
    },
  ];

  opened: number | null = null;
}
