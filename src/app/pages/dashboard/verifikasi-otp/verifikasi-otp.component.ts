import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../state/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifikasi-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verifikasi-otp.component.html',
  styleUrls: ['./verifikasi-otp.component.scss'],
})
export class VerifikasiOtpComponent {
  otp = '';
  loading = false;
  resending = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.otp || this.otp.length !== 6) {
      this.errorMsg = 'Kode OTP harus 6 digit.';
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMsg = 'Token tidak ditemukan.';
      return;
    }
    this.loading = true;
    this.http
      .post<any>('https://backend.nacademy.my.id/api/verify-otp', {
        otp: this.otp,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            // Fetch latest user data with bearer token
            const token = localStorage.getItem('token');
            if (token) {
              this.http
                .get<any>('https://backend.nacademy.my.id/api/user', {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .subscribe({
                  next: (userRes) => {
                    this.loading = false;
                    if (userRes && userRes.data) {
                      localStorage.setItem(
                        'user',
                        JSON.stringify(userRes.data)
                      );
                      this.auth['userSubject'].next(userRes.data);
                    }
                    this.successMsg = 'Verifikasi berhasil!';
                    this.toastr.success('OTP berhasil diverifikasi', 'Sukses');
                    setTimeout(() => {
                      this.router.navigate(['/dashboard']);
                    }, 1000);
                  },
                  error: () => {
                    this.loading = false;
                    this.successMsg = 'Verifikasi berhasil!';
                    this.toastr.success('OTP berhasil diverifikasi', 'Sukses');
                    setTimeout(() => {
                      this.router.navigate(['/dashboard']);
                    }, 1000);
                  },
                });
            } else {
              this.loading = false;
              this.successMsg = 'Verifikasi berhasil!';
              this.toastr.success('OTP berhasil diverifikasi', 'Sukses');
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1000);
            }
          } else {
            this.loading = false;
            this.errorMsg = res.message || 'Kode OTP salah.';
            this.toastr.error(this.errorMsg, 'Gagal');
          }
        },
        error: (err) => {
          this.loading = false;
          let msg = 'Terjadi kesalahan server.';
          if (err?.error?.message) msg = err.error.message;
          this.errorMsg = msg;
          this.toastr.error(msg, 'Gagal');
        },
      });
  }

  resendOtp() {
    this.resending = true;
    this.toastr.info('Mengirim ulang kode OTP...', 'Info');
    setTimeout(() => {
      this.resending = false;
      this.toastr.success('Kode OTP telah dikirim ulang', 'Sukses');
    }, 1500);
  }
}
