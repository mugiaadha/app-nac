import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  loading = false;
  errorMsg = '';
  successMsg = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.selectedFile) {
      this.errorMsg = 'Silakan upload bukti transfer.';
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMsg = 'Token tidak ditemukan.';
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('proof', this.selectedFile);
    this.http.post<any>('https://backend.nacademy.my.id/api/upload-payment-proof', formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.successMsg = res.message || 'Bukti pembayaran berhasil dikirim!';
          this.toastr.success(this.successMsg, 'Sukses');
          this.selectedFile = null;
          this.previewUrl = null;
        } else {
          this.errorMsg = res.message || 'Gagal mengupload bukti pembayaran.';
          this.toastr.error(this.errorMsg, 'Gagal');
        }
      },
      error: (err) => {
        this.loading = false;
        let msg = 'Terjadi kesalahan server.';
        if (err?.error?.message) msg = err.error.message;
        this.errorMsg = msg;
        this.toastr.error(msg, 'Gagal');
      }
    });
  }
}
