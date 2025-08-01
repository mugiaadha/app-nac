import { Component } from '@angular/core';
import { MENUS } from '../../config/menu.config';
import { SiteSettingsService } from '../../state/site-settings.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

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
