import { Component, OnInit, signal } from '@angular/core';
import { SiteSettingsService } from './state/site-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('app-nac');

  constructor(private siteSettings: SiteSettingsService) {}
  
  ngOnInit() {
    this.siteSettings.fetchSettings();
  }
}
