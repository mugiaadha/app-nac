import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../config/categories.config';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent {
  categories = CATEGORIES;
  visibleCount = 12;

  get visibleCategories() {
    return this.categories.slice(0, this.visibleCount);
  }

  showMoreCategories() {
    if (this.visibleCount < this.categories.length) {
      this.visibleCount = Math.min(this.visibleCount + 12, this.categories.length);
    }
  }

  resetCategories() {
    this.visibleCount = 12;
  }
}
