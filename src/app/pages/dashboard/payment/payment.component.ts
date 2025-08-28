import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) {}

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
    this.loading = true;
    // Simulasi upload
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Bukti pembayaran berhasil dikirim!';
      this.toastr.success('Bukti pembayaran berhasil dikirim!', 'Sukses');
      this.selectedFile = null;
      this.previewUrl = null;
    }, 1500);
  }
}
