import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SiteSettingsService } from '../../state/site-settings.service';
import { AuthService } from '../../state/auth.service';
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

  constructor(
    public siteSettings: SiteSettingsService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.siteSettings.settings$.subscribe((settings) => {
      this.logoUrl = settings.logo || '';
    });
  }

  login() {
    const success = this.auth.login(this.email, this.password);
    if (success) {
      this.toastr.success('Login berhasil!', 'Sukses');
    } else {
      this.toastr.error('Email atau password salah!', 'Gagal');
    }
  }
}
