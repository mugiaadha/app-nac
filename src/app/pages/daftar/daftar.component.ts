import { Component } from '@angular/core';
import { AuthService } from '../../state/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-daftar',
  standalone: true,
  templateUrl: './daftar.component.html',
  styleUrls: ['./daftar.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink, LogoComponent],
})
export class DaftarComponent {
  nama = '';
  email = '';
  password = '';
  password_confirmation = '';
  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.loading = true;
    this.errorMsg = '';
    this.auth
      .register({
        name: this.nama,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
      .subscribe({
        next: (success) => {
          this.loading = false;
          if (success) {
            window.location.href = '/dashboard';
          } else {
            this.errorMsg = 'Registrasi gagal. Cek data Anda.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = 'Terjadi kesalahan server.';
        },
      });
  }
}
