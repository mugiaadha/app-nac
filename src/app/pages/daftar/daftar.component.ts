import { Component } from '@angular/core';
import { SiteSettingsService } from '../../state/site-settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-daftar',
  standalone: true,
  templateUrl: './daftar.component.html',
  styleUrls: ['./daftar.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class DaftarComponent {
  nama = '';
  email = '';
  password = '';
  logoUrl = '';

  constructor(public siteSettings: SiteSettingsService) {
    this.siteSettings.settings$.subscribe((settings) => {
      this.logoUrl = settings.logo || './logo-daftar.svg';
    });
  }
}
