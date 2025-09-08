import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RecaptchaModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  siteKey: string = '6LdW48ErAAAAAKqoDiyAPiJJmGE2OkpJlz8xXOva'; // Ganti dengan site key asli
  captchaToken: string | null = '6LdW48ErAAAAAFEH4xSIzu5DM7fqpKqfhrh8BvM8';
  onCaptchaResolved(token: string | null) {
    this.captchaToken = token ?? null;
  }
  @Input() title: string = 'Kirim Feedback';
  loading = false;
  errorMsg = '';
  successMsg = '';
  formData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private toastr: ToastrService) {}

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMsg = 'Semua field wajib diisi.';
      return;
    }
    if (!this.captchaToken) {
      this.errorMsg = 'Captcha harus diisi.';
      return;
    }
    this.loading = true;
    // Simulasi kirim feedback
    setTimeout(() => {
      this.loading = false;
      this.successMsg = 'Feedback berhasil dikirim!';
      this.toastr.success('Feedback berhasil dikirim!', 'Sukses');
      this.formData = { name: '', email: '', message: '' };
      this.captchaToken = null;
    }, 1200);
  }
}
