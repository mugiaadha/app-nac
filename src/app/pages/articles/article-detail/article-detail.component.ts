import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [CommonModule],
})
export class ArticleDetailComponent {
  articleSlug: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.articleSlug = this.route.snapshot.paramMap.get('slug');
  }
}
