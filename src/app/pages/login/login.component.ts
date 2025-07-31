import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SiteSettingsService } from '../../state/site-settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LoginComponent {
  email = '';
  password = '';
  logoUrl = '';

  constructor(public siteSettings: SiteSettingsService, private toastr: ToastrService) {
    this.siteSettings.settings$.subscribe((settings) => {
      this.logoUrl = settings.logo || '';
    });
  }

  login() {
    // Contoh pemanggilan toaster
    this.toastr.success('Login berhasil!', 'Sukses');
  }
}
