export const MENUS = [
  { label: 'Beranda', link: '/' },
  { label: 'Brevet', link: '/brevet' },
  // { label: 'Pelatihan', link: '/courses' },
  { label: 'Artikel', link: '/articles' },
  {
    label: 'Layanan',
    children: [
      { label: 'Compliance', link: '/services/compliance' },
      { label: 'Konsultasi', link: '/services/konsultasi' },
      { label: 'Case', link: '/services/case' },
    ],
  },
  { label: 'Pusat Bantuan', link: '/pusat-bantuan' },
];
