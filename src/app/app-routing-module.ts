import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeoResolver } from './resolvers/seo.resolver';
import { SEO_CONFIG } from './config/seo.config';
import { LoginComponent } from './pages/login/login.component';
import { DaftarComponent } from './pages/daftar/daftar.component';
import { PusatBantuanComponent } from './pages/pusat-bantuan/pusat-bantuan.component';
import { authGuard } from './guards/auth.guard';
import { OuterLayoutComponent } from './layouts/outer-layout.component';
import { InnerLayoutComponent } from './layouts/inner-layout.component';
import { NonSidebarLayoutComponent } from './layouts/non-sidebar-layout/non-sidebar-layout.component';
import { DaftarBrevetComponent } from './pages/daftar-brevet/daftar-brevet.component';

export const routes: Routes = [
  {
    path: '',
    component: OuterLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.home },
      },
      {
        path: 'login',
        component: LoginComponent,
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.login },
      },
      {
        path: 'daftar',
        component: DaftarComponent,
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.daftar },
      },
      {
        path: 'daftar-brevet/:type',
        component: DaftarBrevetComponent,
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.daftar },
      },
      {
        path: 'pusat-bantuan',
        component: PusatBantuanComponent,
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.pusatBantuan },
      },
      {
        path: 'syarat-ketentuan',
        loadComponent: () =>
          import('./pages/syarat-ketentuan/syarat-ketentuan.component').then(
            (m) => m.SyaratKetentuanComponent
          ),
        data: { seo: { title: 'Syarat dan Ketentuan' } },
      },
      {
        path: 'kebijakan-privasi',
        loadComponent: () =>
          import('./pages/kebijakan-privasi/kebijakan-privasi.component').then(
            (m) => m.KebijakanPrivasiComponent
          ),
        data: { seo: { title: 'Kebijakan Privasi' } },
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./pages/courses/courses.module').then((m) => m.CoursesModule),
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.courses },
      },
      {
        path: 'brevet-pajak',
        loadComponent: () =>
          import('./pages/brevet-pajak/brevet-pajak.component').then(
            (m) => m.BrevetPajakComponent
          ),
      },
      {
        path: 'brevet-pajak/:id',
        loadComponent: () =>
          import(
            './pages/brevet-pajak/brevet-detail/brevet-detail.component'
          ).then((m) => m.BrevetDetailComponent),
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./pages/articles/articles.module').then(
            (m) => m.ArticlesModule
          ),
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.articles },
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./pages/services/services.module').then(
            (m) => m.ServicesModule
          ),
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.services },
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: InnerLayoutComponent,
    resolve: { seo: SeoResolver },
    data: { seo: SEO_CONFIG.dashboard },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './pages/dashboard/dashboard-home/dashboard-home.component'
          ).then((m) => m.DashboardHomeComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/dashboard/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'certificates',
        loadComponent: () =>
          import('./pages/dashboard/certificates/certificates.component').then(
            (m) => m.CertificatesComponent
          ),
      },
      {
        path: 'my-courses',
        loadComponent: () =>
          import('./pages/dashboard/my-courses/my-courses.component').then(
            (m) => m.MyCoursesComponent
          ),
      },
      {
        path: 'my-courses/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/course-detail/course-detail.component'
          ).then((m) => m.CourseDetailComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: NonSidebarLayoutComponent,
    resolve: { seo: SeoResolver },
    data: { seo: SEO_CONFIG.dashboard },
    children: [
      {
        path: 'verifikasi-email',
        loadComponent: () =>
          import(
            './pages/dashboard/verifikasi-email/verifikasi-email.component'
          ).then((m) => m.VerifikasiEmailComponent),
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/dashboard/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
      },
      {
        path: 'course-learning/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/course-learning/course-learning.component'
          ).then((m) => m.CourseLearningComponent),
      },
      {
        path: 'course-learning/:id/:lessonId',
        loadComponent: () =>
          import(
            './pages/dashboard/course-learning/course-learning.component'
          ).then((m) => m.CourseLearningComponent),
      },
      {
        path: 'quiz/:courseId/:lessonId',
        loadComponent: () =>
          import('./pages/dashboard/quiz/quiz.component').then(
            (m) => m.QuizComponent
          ),
      },
    ],
  },
  {
    path: '**',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
