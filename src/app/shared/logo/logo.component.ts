import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SiteSettingsService } from '../../state/site-settings.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  logoUrl: string = './logo-daftar.svg';
  constructor(private siteSettings: SiteSettingsService) {
    this.siteSettings.settings$.subscribe(settings => {
      this.logoUrl = settings.logo || './logo-daftar.svg';
    });
  }
}
