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
  phone = '';

  constructor(private auth: AuthService) {}

  submit() {
    this.loading = true;
    this.errorMsg = '';
    this.auth
      .register({
        name: this.nama,
        email: this.email,
        phone: this.phone,
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
          // Cek jika error response dari backend
          if (err?.error) {
            const res = err.error;
            if (res.message) {
              this.errorMsg = res.message;
            }
            // Gabungkan error validasi field jika ada
            if (res.data && typeof res.data === 'object') {
              const fieldErrors = Object.entries(res.data)
                .map(([field, msgs]) =>
                  Array.isArray(msgs) ? msgs.join('\n') : msgs,
                )
                .join('\n');
              if (fieldErrors) {
                this.errorMsg += (this.errorMsg ? '\n' : '') + fieldErrors;
              }
            }
          } else {
            this.errorMsg = 'Terjadi kesalahan server.';
          }
        },
      });
  }
}
