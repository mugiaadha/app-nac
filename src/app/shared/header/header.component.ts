import { Component } from '@angular/core';
import { MENUS } from '../../config/menu.config';
import { SiteSettingsService } from '../../state/site-settings.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../state/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [LogoComponent, AsyncPipe, RouterLink, CommonModule],
})
export class HeaderComponent {
  menus = MENUS;
  isLoggingOut = false;

  constructor(
    public siteSettings: SiteSettingsService,
    public auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  logout() {
    this.isLoggingOut = true;
    this.auth.logout();
    this.toastr.success('Logged out successfully!');
    this.router.navigate(['/']);
    this.isLoggingOut = false;
  }
}
