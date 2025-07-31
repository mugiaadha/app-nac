import { Component } from '@angular/core';
import { MENUS } from '../../config/menu.config';
import { SiteSettingsService } from '../../state/site-settings.service';
import { LogoComponent } from '../../shared/logo.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [LogoComponent, AsyncPipe, RouterLink, CommonModule],
})
export class HeaderComponent {
  menus = MENUS;
  constructor(public siteSettings: SiteSettingsService) {}
}
