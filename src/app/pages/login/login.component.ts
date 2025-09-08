import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  logoUrl = '';
  isLoading = false;

  constructor(
    public siteSettings: SiteSettingsService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.siteSettings.settings$.subscribe((settings) => {
      this.logoUrl = settings.logo || '';
    });
  }

  ngOnInit() {
    // Cek apakah user sudah login, jika iya redirect ke dashboard
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  login() {
    if (this.isLoading) return;

    this.showLoginLoading();
    this.performLogin();
  }

  private showLoginLoading() {
    this.isLoading = true;
    this.toastr.info('Memverifikasi akun Anda...', 'Tunggu Sebentar', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: false,
      tapToDismiss: false,
    });
  }

  private performLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (success) => {
        this.handleLoginResponse(success);
      },
      error: (error) => {
        this.handleLoginError(error);
      },
    });
  }

  private handleLoginResponse(success: boolean) {
    this.isLoading = false;
    this.toastr.clear();

    if (success) {
      this.toastr.success('Selamat datang kembali!', 'Login Berhasil');

      // Cek apakah ada intended URL, jika tidak redirect ke dashboard
      const intendedUrl = localStorage.getItem('intendedUrl');
      const redirectUrl = intendedUrl || '/dashboard';

      // Hapus intended URL dari localStorage
      if (intendedUrl) {
        localStorage.removeItem('intendedUrl');
      }

      // Redirect setelah delay untuk user bisa melihat success message
      setTimeout(() => {
        this.router.navigate([redirectUrl]);
      }, 1500);
    } else {
      this.toastr.error('Email atau password tidak valid', 'Login Gagal');
    }
  }

  private handleLoginError(error: any) {
    this.isLoading = false;
    this.toastr.clear();
    this.toastr.error('Koneksi bermasalah, coba lagi', 'Terjadi Kesalahan');
    console.error('Login error:', error);
  }
}
