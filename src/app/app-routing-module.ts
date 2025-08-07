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
        path: 'pusat-bantuan',
        component: PusatBantuanComponent,
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.pusatBantuan },
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./pages/courses/courses.module').then((m) => m.CoursesModule),
        resolve: { seo: SeoResolver },
        data: { seo: SEO_CONFIG.courses },
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
    component: InnerLayoutComponent,
    canActivate: [authGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
