import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() logo?: string;
}
