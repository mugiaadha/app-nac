import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../state/auth.service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing = false;
  editedUser: Partial<User> = {};

  constructor(
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.editedUser = { ...user };
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user) {
      this.editedUser = { ...this.user };
    }
  }

  saveProfile() {
    if (this.editedUser) {
      // Simulate save
      this.toastr.success('Profile updated successfully!', 'Success');
      this.isEditing = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    if (this.user) {
      this.editedUser = { ...this.user };
    }
  }
}
