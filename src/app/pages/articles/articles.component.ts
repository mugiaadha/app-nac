import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ARTICLES } from '../../config/articles.config';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [CommonModule, RouterLink, DatePipe, FormsModule],
})
export class ArticlesComponent {
  articles = ARTICLES;

  uniqueCategories: string[] = Array.from(
    new Set(this.articles.map((b) => b.category))
  );
  searchTerm: string = '';
  searchFilter: string = 'all';
  currentPage: number = 1;
  pageSize: number = 5;

  get filteredArticles() {
    if (!this.searchTerm) return this.articles;
    const term = this.searchTerm.toLowerCase();
    switch (this.searchFilter) {
      case 'title':
        return this.articles.filter((article) =>
          article.title.toLowerCase().includes(term)
        );
      case 'author':
        return this.articles.filter((article) =>
          article.author.toLowerCase().includes(term)
        );
      case 'category':
        // kategori dummy, bisa diubah jika ada field kategori di data article
        return this.articles.filter((article) =>
          article.summary.toLowerCase().includes(term)
        );
      default:
        return this.articles.filter(
          (article) =>
            article.title.toLowerCase().includes(term) ||
            article.author.toLowerCase().includes(term) ||
            article.summary.toLowerCase().includes(term)
        );
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredArticles.length / this.pageSize) || 1;
  }

  get totalPagesArr() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedArticles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredArticles.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  constructor(private route: ActivatedRoute) {
    // Inisialisasi kategori unik dari articles
    this.uniqueCategories = Array.from(
      new Set(this.articles.map((b) => b.category))
    );
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchTerm = params['search'];
      }
      if (params['filter']) {
        this.searchFilter = params['filter'];
      }
    });
  }
}
