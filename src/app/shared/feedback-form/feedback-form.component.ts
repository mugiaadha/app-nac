import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Input() title: string = 'Kirim Feedback';
  loading = false;
  errorMsg = '';
  successMsg = '';
  formData = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMsg = 'Semua field wajib diisi.';
      return;
    }
    this.loading = true;
    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message,
      subject: this.title,
    };
    this.http.post(environment.baseUrl + '/send-feedback', payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Feedback berhasil dikirim!';
        this.toastr.success('Feedback berhasil dikirim!', 'Sukses');
        this.formData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Gagal mengirim feedback.';
        this.toastr.error('Gagal mengirim feedback!', 'Error');
      },
    });
  }
}
