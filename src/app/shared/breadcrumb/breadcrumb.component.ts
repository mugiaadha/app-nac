import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MENUS } from '../../config/menu.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbs();
      });
    this.buildBreadcrumbs();
  }

  buildBreadcrumbs() {
    const urlSegments = this.router.url.split('/').filter(Boolean);
    let url = '';
    this.breadcrumbs = urlSegments.map((segment, i) => {
      url += '/' + segment;
      return {
        label: this.findLabel(url, segment),
        url,
      };
    });
    // Tambahkan beranda di awal
    this.breadcrumbs = [
      { label: this.findLabel('/', ''), url: '/' },
      ...this.breadcrumbs,
    ];
  }

  findLabel(url: string, segment: string): string {
    // Cari label di menu utama
    for (const menu of MENUS) {
      if (menu.link === url) return menu.label;
      if (menu.children) {
        for (const child of menu.children) {
          if (child.link === url) return child.label;
        }
      }
    }
    // Fallback ke decode segment
    return decodeURIComponent(segment);
  }
}
