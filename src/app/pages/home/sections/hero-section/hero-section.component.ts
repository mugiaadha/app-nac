
import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  imports: [FormsModule]
})

export class HeroSectionComponent {
  searchValue: string = '';

  constructor(private router: Router) {}

  handleSearch() {
    if (this.searchValue && this.searchValue.trim()) {
      this.router.navigate(['/courses'], { queryParams: { search: this.searchValue } });
    } else {
      this.router.navigate(['/courses']);
    }
  }
}
