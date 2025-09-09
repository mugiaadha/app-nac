import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environment';

declare const grecaptcha: any;

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha-component.html',
  styleUrls: ['./recaptcha-component.scss'],
})
export class RecaptchaComponent implements AfterViewInit {
  @Output() verified = new EventEmitter<string>();

  ngAfterViewInit() {
    grecaptcha.render('recaptcha-container', {
      sitekey: environment.recaptchaSiteKey,
      callback: (token: string) => {
        this.verified.emit(token);
      },
    });
  }
}
