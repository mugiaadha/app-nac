import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: ':id', component: ArticleDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticlesComponent,
    ArticleDetailComponent,
  ],
})
export class ArticlesModule {}
