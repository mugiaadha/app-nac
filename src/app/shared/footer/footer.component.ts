import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo.component';
import { SiteSettingsService } from '../../state/site-settings.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MENUS } from '../../config/menu.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, AsyncPipe, CommonModule, RouterLink],
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  menus = MENUS;
  siteSettings = inject(SiteSettingsService);
}
