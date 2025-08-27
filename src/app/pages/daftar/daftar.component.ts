import { Component } from '@angular/core';
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

  constructor() {}
}
