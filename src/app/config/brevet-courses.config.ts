export interface BrevetCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  totalLessons: number;
  modules: BrevetModule[];
  category: string;
  img: string;
  progress: number;
  isEnrolled: boolean;
  isCertified: boolean;
}

export interface BrevetModule {
  id: string;
  title: string;
  description: string;
  lessons: BrevetLesson[];
  duration: string;
  isCompleted: boolean;
}

export interface BrevetLesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration: string;
  videoUrl?: string;
  content?: string;
  isCompleted: boolean;
  isLocked: boolean;
  questions?: any[];
}

export const BREVET_COURSES: BrevetCourse[] = [
  {
    id: 'brevet-a',
    slug: 'brevet-a',
    title: 'Brevet Pajak A',
    subtitle: 'Dasar-dasar Perpajakan',
    description:
      'Program pelatihan dasar perpajakan untuk pemahaman fundamental sistem pajak Indonesia',
    level: 'Beginner',
    duration: '40 Jam',
    totalLessons: 24,
    category: 'Perpajakan Dasar',
    img: './images/courses/brevet-a.webp',
    progress: 0,
    isEnrolled: true,
    isCertified: false,
    modules: [
      {
        id: 'module-1',
        title: 'Pengenalan Sistem Perpajakan Indonesia',
        description: 'Memahami dasar-dasar sistem perpajakan di Indonesia',
        duration: '5 Jam',
        isCompleted: false,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Sejarah Perpajakan Indonesia',
            description:
              'Memahami perkembangan sistem pajak Indonesia dari masa ke masa',
            type: 'video',
            duration: '30 menit',
            videoUrl: 'https://example.com/video1',
            isCompleted: false,
            isLocked: false,
          },
          {
            id: 'lesson-2',
            title: 'Fungsi dan Tujuan Pajak',
            description: 'Memahami fungsi budgetair dan regulerend dari pajak',
            type: 'video',
            duration: '45 menit',
            videoUrl: 'https://example.com/video2',
            isCompleted: false,
            isLocked: false,
          },
          {
            id: 'lesson-3',
            title: 'Quiz: Dasar Perpajakan',
            description: 'Evaluasi pemahaman materi dasar perpajakan',
            type: 'quiz',
            duration: '15 menit',
            isCompleted: false,
            isLocked: false,
            questions: [
              {
                id: 1,
                question: 'Apa fungsi utama pajak bagi negara?',
                type: 'multiple-choice',
                options: [
                  'Fungsi Budgetair (membiayai pengeluaran negara)',
                  'Fungsi Regulerend (mengatur perekonomian)',
                  'Kedua fungsi di atas',
                  'Tidak ada fungsi khusus',
                ],
                correctAnswer: 2,
                explanation:
                  'Pajak memiliki dua fungsi utama yaitu fungsi budgetair untuk membiayai pengeluaran negara dan fungsi regulerend untuk mengatur perekonomian.',
              },
            ],
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP)',
        description: 'Memahami KUP sebagai dasar administrasi perpajakan',
        duration: '6 Jam',
        isCompleted: false,
        lessons: [
          {
            id: 'lesson-4',
            title: 'Pengertian dan Ruang Lingkup KUP',
            description: 'Memahami ketentuan umum dalam perpajakan Indonesia',
            type: 'video',
            duration: '40 menit',
            videoUrl: 'https://example.com/video4',
            isCompleted: false,
            isLocked: true,
          },
          {
            id: 'lesson-5',
            title: 'Nomor Pokok Wajib Pajak (NPWP)',
            description: 'Tata cara pendaftaran dan penggunaan NPWP',
            type: 'video',
            duration: '35 menit',
            videoUrl: 'https://example.com/video5',
            isCompleted: false,
            isLocked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'brevet-b',
    slug: 'brevet-b',
    title: 'Brevet Pajak B',
    subtitle: 'Perpajakan Menengah',
    description:
      'Program pelatihan perpajakan tingkat menengah untuk praktisi dan konsultan pajak',
    level: 'Intermediate',
    duration: '60 Jam',
    totalLessons: 36,
    category: 'Perpajakan Menengah',
    img: './images/courses/brevet-b.webp',
    progress: 0,
    isEnrolled: true,
    isCertified: false,
    modules: [
      {
        id: 'module-1',
        title: 'PPh Badan Lanjutan',
        description: 'Memahami perhitungan PPh Badan secara mendalam',
        duration: '8 Jam',
        isCompleted: false,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Perhitungan PPh Badan',
            description:
              'Metode perhitungan PPh Badan untuk berbagai jenis usaha',
            type: 'video',
            duration: '50 menit',
            videoUrl: 'https://example.com/video-b1',
            isCompleted: false,
            isLocked: false,
          },
        ],
      },
    ],
  },
  {
    id: 'brevet-c',
    slug: 'brevet-c',
    title: 'Brevet Pajak C',
    subtitle: 'Konsultan Pajak Profesional',
    description:
      'Program pelatihan perpajakan tingkat lanjut untuk menjadi konsultan pajak bersertifikat',
    level: 'Advanced',
    duration: '80 Jam',
    totalLessons: 48,
    category: 'Perpajakan Lanjut',
    img: './images/courses/brevet-c.webp',
    progress: 0,
    isEnrolled: true,
    isCertified: false,
    modules: [
      {
        id: 'module-1',
        title: 'International Taxation',
        description: 'Memahami perpajakan internasional dan transfer pricing',
        duration: '10 Jam',
        isCompleted: false,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Dasar Perpajakan Internasional',
            description: 'Konsep dasar dalam perpajakan internasional',
            type: 'video',
            duration: '60 menit',
            videoUrl: 'https://example.com/video-c1',
            isCompleted: false,
            isLocked: false,
          },
        ],
      },
    ],
  },
];

export function getBrevetCourseById(id: string): BrevetCourse | undefined {
  return BREVET_COURSES.find((course) => course.id === id);
}

export function getBrevetCourseBySlug(slug: string): BrevetCourse | undefined {
  return BREVET_COURSES.find((course) => course.slug === slug);
}
