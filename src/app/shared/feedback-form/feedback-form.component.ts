import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Input() title: string = 'Kirim Feedback';

  siteKey: string = environment.recaptchaSiteKey;
  captchaToken: string | null = '';
  loading = false;
  errorMsg = '';
  successMsg = '';
  formData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) {}

  ngAfterViewInit() {
    if ((window as any).grecaptcha) {
      (window as any).grecaptcha.render('recaptcha-container', {
        sitekey: this.siteKey,
        callback: (token: string) => {
          this.captchaToken = token;
        },
      });
    }
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMsg = 'Semua field wajib diisi.';
      return;
    }
    if (!(window as any).grecaptcha) {
      this.errorMsg = 'Captcha belum termuat.';
      return;
    }
    this.loading = true;
    this.captchaToken = (window as any).grecaptcha.getResponse();
    if (!this.captchaToken) {
      this.errorMsg = 'Captcha harus diisi.';
      this.loading = false;
      return;
    }
    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message,
      subject: `${this.title} [${this.formData.email}]`,
      captchaToken: this.captchaToken,
    };
    this.http.post(environment.baseUrl + '/send-feedback', payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Feedback berhasil dikirim!';
        this.toastr.success('Feedback berhasil dikirim!', 'Sukses');
        this.formData = { name: '', email: '', message: '' };
        if ((window as any).grecaptcha) {
          (window as any).grecaptcha.reset();
        }
        this.captchaToken = null;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.message ?? 'Gagal mengirim feedback.';
        this.toastr.error('Gagal mengirim feedback!', 'Error');
      },
    });
  }
}
